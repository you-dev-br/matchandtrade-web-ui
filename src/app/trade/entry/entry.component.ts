import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { NavigationService } from '../../service/navigation.service';
import { Trade } from '../../class/pojo/trade';
import { TradeService } from '../../service/trade.service';

@Component({
  selector: 'app-trade-list',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
  providers: [TradeService]
})
export class EntryComponent implements OnInit {
  descriptionFormControl: AbstractControl;
  errorMessage: string;
  href: string;
  nameFormControl: AbstractControl;
  trade: Trade = new Trade();
  tradeFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private tradeService: TradeService) { }

  ngOnInit() {
    this.href = this.navigationService.obtainData(this.route);
    this.tradeService
      .find(this.href)
      .then(v => this.trade = v)
      .catch(e => this.errorMessage = e)
			.then(() => {
				this.buildForm();
				this.populateForm();		
			});
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

  onSubmit(): void {
    console.log(this.trade);
  }
}
