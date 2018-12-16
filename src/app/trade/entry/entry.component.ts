import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TradeService } from '../../service/trade.service';
import { Trade } from '../../class/pojo/trade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trade-list',
  templateUrl: './entry.component.html',
	styleUrls: ['./entry.component.scss'],
	providers: [TradeService]
})
export class EntryComponent implements OnInit {
	trade: Trade = new Trade();
  tradeFormGroup: FormGroup;
  descriptionFormControl: AbstractControl;
  nameFormControl: AbstractControl;

	constructor(
		private formBuilder: FormBuilder,
		private tradeService: TradeService,
		private router: Router) { }

  ngOnInit() {
		this.trade = this.tradeService.find(1);
		this.buildForm();
		this.populateForm();
	}

	private buildForm(): void {
    this.tradeFormGroup = this.formBuilder.group({
			'description': ['',Validators.compose([this.descriptionValidator])],
			'name': ['',Validators.compose([Validators.required, this.nameValidator])],
      'state': []
		});
		this.descriptionFormControl = this.tradeFormGroup.controls['description'];
    this.nameFormControl = this.tradeFormGroup.controls['name'];
	}

	private descriptionValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && (control.value.length < 3 || control.value.length > 1000)) {
      return {invalid: true};
    }
  }

	private nameValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && (control.value.length < 3 || control.value.length > 150)) {
      return {invalid: true};
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
