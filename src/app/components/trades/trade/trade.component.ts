import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { FormControl } from '@angular/forms/src/model';
import { KeyValuePair } from '../../../classes/pojo/key-value-pair';
import { Message, MessageType } from '../../../components/message/message';
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

  loading: boolean = true;
  message: Message = new Message();
  states: KeyValuePair[] = [];
  trade: Trade = new Trade();

  constructor(private route: ActivatedRoute, formBuilder: FormBuilder, private tradeService: TradeService) {
    let tradeId = route.snapshot.params['tradeId'];
    if (tradeId == RouteAction.CREATE) {
      this.loading = false;
      this.buildForm(formBuilder);
    } else {
      const href = route.snapshot.paramMap.get('href');
      this.tradeService.get(href).then(v => {
        this.trade = v;
        this.loading = false;
        this.buildForm(formBuilder);
        this.populateForm();
      }).catch(e => this.message.setErrorItems(e));
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

  private populateForm() {
    this.nameFormControl.setValue(this.trade.name);
    this.stateFormControl.setValue(this.trade.state);
    this.stateFormControl.enable();
  }
  
  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && (control.value.length < 3 || control.value.length > 150)) {
      return {invalid: true};
    }
  }

  onSubmit() {
    this.loading = true;
    this.trade.name = this.nameFormControl.value;
    this.trade.state = this.stateFormControl.value;
    this.tradeService.save(this.trade).then(v => {
      this.loading = false;
      this.trade = v;
      this.populateForm();
      this.tradeFormGroup.markAsPristine();
      this.message.setInfoItems("Trade saved.");      
    }).catch(e => {
      this.message.setErrorItems(e);
      this.loading = false;
      this.tradeFormGroup.markAsPristine();
    });
  }

}
