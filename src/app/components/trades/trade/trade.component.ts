import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Erratum } from '../../../classes/pojo/erratum';
import { FormControl } from '@angular/forms/src/model';
import { KeyValuePair } from '../../../classes/pojo/key-value-pair';
import { RouteAction } from '../../../classes/route/route-action';
import { Trade, TradeState } from '../../../classes/pojo/trade';
import { TradeService } from '../../../services/trade.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
  providers: [ TradeService ]
})
export class TradeComponent {
  tradeFormGroup: FormGroup;
  nameFormControl: AbstractControl;
  stateFormControl: AbstractControl;
  states: KeyValuePair[] = [];
  loading: boolean = true;
  errata = new Array<Erratum>();
  trade: Trade = new Trade();

  constructor(private route: ActivatedRoute, formBuilder: FormBuilder, private tradeService: TradeService) {
    let tradeId = route.snapshot.params['tradeId'];
    if (tradeId == RouteAction.CREATE) {
      this.loading = false;
      this.buildForm(formBuilder);
    } else {
      this.tradeService.get(tradeId).then((v) => {
        this.trade = v;
        this.loading = false;
        this.buildForm(formBuilder);
        this.populateForm(v);
      }).catch((e) => this.errata.push(new Erratum(e)));
    }
  }

  private buildForm(formBuilder: FormBuilder): void {
    this.tradeFormGroup = formBuilder.group({
      'name': ['',Validators.compose([Validators.required, this.nameValidator])],
      'state': []
    });
    this.nameFormControl = this.tradeFormGroup.controls['name'];
    this.stateFormControl = this.tradeFormGroup.controls['state'];
    for(let v in TradeState) {
      this.states.push(new KeyValuePair(v, TradeState[v].toString()));
    }
    this.stateFormControl.setValue(TradeState[TradeState.SUBMITTING_ITEMS]);
    this.stateFormControl.disable();
  }

  private populateForm(trade: Trade) {
    this.nameFormControl.setValue(trade.name);
    this.stateFormControl.setValue(trade.state);
    this.stateFormControl.enable();
  }
  
  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && (control.value.length < 3 || control.value.length > 150)) {
      return {invalid: true};
    }
  }

  onSubmit() {
    this.loading = true;
    this.errata.forEach(() => this.errata.pop());
    this.trade.name = this.tradeFormGroup.controls['name'].value;
    this.trade.state = this.stateFormControl.value;
    this.tradeService.save(this.trade).then((v) => {
      Object.assign(this.trade, v);
      this.loading = false;
      this.tradeFormGroup.markAsPristine();
    }).catch((e) => {
      this.errata.push(new Erratum(e));
      this.loading = false;
      this.tradeFormGroup.markAsPristine();
    });
  }

}
