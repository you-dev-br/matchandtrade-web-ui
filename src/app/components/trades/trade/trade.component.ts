import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { FormControl } from '@angular/forms/src/model';
import { KeyValuePair } from '../../../classes/pojo/key-value-pair';
import { Message, MessageType } from '../../../components/message/message';
import { RouteAction } from '../../../classes/route/route-action';
import { Trade, TradeState } from '../../../classes/pojo/trade';
import { TradeService } from '../../../services/trade.service';
import { TradesComponent } from '../trades.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
  providers: [ TradeService, UserService ]
})
export class TradeComponent implements OnInit {
  trade: Trade = new Trade();
  tradeFormGroup: FormGroup;
  nameFormControl: AbstractControl;
  routeAction: string;
  stateFormControl: AbstractControl;

  loading: boolean = true;
  message: Message = new Message();
  states: KeyValuePair[] = [];

  constructor(private route: ActivatedRoute, formBuilder: FormBuilder, private tradeService: TradeService, private userService: UserService) {
    this.buildForm(formBuilder);
    this.routeAction = this.route.snapshot.params['routeAction'];
  }

  userId: number;
  ngOnInit() {
    if (this.routeAction == RouteAction.CREATE) {
      this.loading = false;
    } else if (this.routeAction == RouteAction.VIEW) {
      let tradeHref = this.route.snapshot.paramMap.get('href');
      this.tradeService.get(tradeHref).then(v => {
        this.loading = false;
        this.trade = v;
        this.populateForm(this.trade);
      }).catch(e => this.message.setErrorItems(e));
    } else {
      this.message.setErrorItems("Unknown route action: " + this.routeAction);
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
  }

  isStateDisplayable() {
    return (this.routeAction == RouteAction.VIEW || this.stateFormControl.value != null);
  }

  private populateForm(trade: Trade) {
    this.nameFormControl.setValue(trade.name);
    this.stateFormControl.setValue(trade.state);
  }
  
  private nameValidator(control: FormControl): {[s: string]: boolean} {
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
      this.populateForm(this.trade);
      this.tradeFormGroup.markAsPristine();
      this.message.setInfoItems("Trade saved.");      
    }).catch(e => {
      this.message.setErrorItems(e);
      this.loading = false;
      this.tradeFormGroup.markAsPristine();
    });
  }

}
