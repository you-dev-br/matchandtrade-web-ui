import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { LoadingAndErrorSupport } from 'src/app/class/util/loading-and-error-support';
import { MembershipService } from 'src/app/service/membership.service';
import { NavigationService } from '../../service/navigation.service';
import { Trade } from '../../class/pojo/trade';
import { TradeService } from '../../service/trade.service';
import { Membership, TradeMembershipType } from 'src/app/class/pojo/membership';

@Component({
  selector: 'app-trade-list',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  providers: [TradeService]
})
export class EntryComponent extends LoadingAndErrorSupport implements OnInit {
  descriptionFormControl: AbstractControl;
  href: string;
	tradeOwner: false;
	nameFormControl: AbstractControl;
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
    this.href = this.navigationService.obtainData(this.route);
    try {
      this.trade = await this.tradeService.find(this.href);
			this.trade.setHref(this.href);

			this.buildForm();
      this.populateForm();

			const membership: Membership = await this.membershipService.findByTradeId(this.trade.tradeId);
			if (!membership || membership.type != TradeMembershipType.OWNER) {
				this.tradeFormGroup.disable()
			}
    } catch (e) {
      this.errorMessage = e;
    } finally {
      this.loading = false;
    }
  }

  private buildForm(): void {
    this.tradeFormGroup = this.formBuilder.group({
      'description': ['', Validators.compose([this.descriptionValidator])],
      'name': ['', Validators.compose([Validators.required, this.nameValidator])],
      'state': []
    });
    this.descriptionFormControl = this.tradeFormGroup.controls['description'];
    this.nameFormControl = this.tradeFormGroup.controls['name'];
  }

  private descriptionValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value && (control.value.length < 3 || control.value.length > 1000)) {
      return { invalid: true };
    }
  }
  
  private nameValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value && (control.value.length < 3 || control.value.length > 150)) {
      return { invalid: true };
    }
  }

  private populateForm() {
    this.nameFormControl.setValue(this.trade.name);
    this.descriptionFormControl.setValue(this.trade.description);
  }

  onSubmit() {
    this.loading = true;
    this.tradeService
      .save(this.trade)
      .catch(e => this.errorMessage = e)
      .then(() => this.loading = false);
  }
}
