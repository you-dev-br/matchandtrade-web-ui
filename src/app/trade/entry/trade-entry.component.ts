import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { KeyValue } from '@angular/common';
import { LoadingAndMessageBannerSupport } from 'src/app/class/common/loading-and-message-banner-support';
import { MembershipService } from 'src/app/service/membership.service';
import { Membership, MembershipType } from 'src/app/class/pojo/membership';
import { NavigationService } from '../../service/navigation.service';
import { TextEditorComponent } from '../../common/text-editor/text-editor.component';
import { Trade, TradeState, TradeUtil } from '../../class/pojo/trade';
import { TradeService } from '../../service/trade.service';

@Component({
  selector: 'app-trade-entry',
  templateUrl: './trade-entry.component.html',
  styleUrls: ['./trade-entry.component.scss'],
  providers: [TradeService]
})
export class TradeEntryComponent extends LoadingAndMessageBannerSupport implements OnInit {
  availableStates: KeyValue<TradeState, string>[] = [];
  @ViewChild('descriptionTextEditor')
  descriptionTextEditor: TextEditorComponent;
  nameFormControl: AbstractControl;
  membership: Membership;
  stateFormControl: AbstractControl;
  newEntry: boolean = true;
  @ViewChild('title', { read: ElementRef })
  title: ElementRef;
  trade: Trade = new Trade();
  tradeFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private membershipService: MembershipService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private tradeService: TradeService) {
    super();
  }

  async ngOnInit() {
    this.buildForm();
    try {
      const tradeHref = this.navigationService.obtainData(this.route).tradeHref;
      if (tradeHref) {
        this.trade = await this.tradeService.find(tradeHref);
        await this.loadTrade();
      }
    } catch (e) {
      this.showErrorMessage(e);
    } finally {
      this.loading = false;
    }
  }

  private authenticatedUserIsTradeOwner(): boolean {
    return this.membership && this.membership.type == MembershipType.OWNER;
  }

  private buildForm(): void {
    this.tradeFormGroup = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, this.nameValidator])],
      'state': []
    });
    this.nameFormControl = this.tradeFormGroup.controls['name'];
    this.stateFormControl = this.tradeFormGroup.controls['state'];
  }

  classMainForm(): string {
    return this.loading ? "mt-content mt-hide" : "mt-content";
  }

  private async loadTrade(): Promise<void> {
    this.newEntry = false;
    this.nameFormControl.setValue(this.trade.name);
    
    // Populate available states only
    this.availableStates = TradeUtil.toAvailableStatesKeyValue(this.trade.state).sort((a, b) => TradeUtil.compareStates(a.key, b.key));
    this.stateFormControl.setValue(this.trade.state);

    // Disable form if autheticated user is not the trade owner
    try {
      this.membership = await this.membershipService.findByTradeId(this.trade.tradeId);
      if (!this.authenticatedUserIsTradeOwner()) {
        this.tradeFormGroup.disable();
      }
    } catch (e) {
      this.showErrorMessage(e);
    }
  }

  private loadTradeFromForm() {
    this.trade.name = this.nameFormControl.value;
    this.trade.description = this.descriptionTextEditor.getValue();
    // Sanitize description, empty string must be treated as undefined or we get server error: description must be bigger than 3 chars
    if (this.trade.description != null && this.trade.description.trim().length == 0) {
        this.trade.description = undefined;
    }
    this.trade.state = this.stateFormControl.value;
  }

  private nameValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value || (control.value.length < 3 || control.value.length > 150)) {
      return { invalid: true };
    }
  }

  showStatus(): boolean {
    return !this.newEntry;
  }

  showSaveButton(): boolean {
    return this.authenticatedUserIsTradeOwner() || this.trade.getSelfHref() == null;
  }

  async onSubmit() {
    this.loading = true;
    try {
      this.loadTradeFromForm();
      this.validateTrade();
      this.trade = await this.tradeService.save(this.trade);
      this.loadTrade();
      this.showInfoMessage('Trade saved', 'save');
    } catch (e) {
      this.showErrorMessage(e);
    } finally {
      this.loading = false;
      this.title.nativeElement.scrollIntoView();
    }
  }

  private validateTrade(): any {
    if (!this.trade.name || this.trade.name.length < 3 || this.trade.name.length > 150) {
      throw Error('Name is mandatory and must contain between 3 and 150 characters');
    }

    if (this.trade.description && this.trade.description.trim().length < 3) {
      throw Error('Description must contain at least 3 characters')
    } else if (this.trade.description && this.trade.description.trim().length > 20000) {
      throw Error('Description is too long')
    }
  }
}
