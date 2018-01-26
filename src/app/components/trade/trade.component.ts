import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { KeyValuePair } from '../../classes/pojo/key-value-pair';
import { Message, MessageType } from '../../components/message/message';
import { Page } from '../../classes/search/page';
import { SearchResult } from '../../classes/search/search-result';
import { Trade, TradeState } from '../../classes/pojo/trade';
import { TradeMembership, TradeMembershipType } from '../../classes/pojo/trade-membership';
import { TradeMembershipService } from '../../services/trade-membership.service';
import { TradeService } from '../../services/trade.service';
import { UserService } from '../../services/user.service';

export class TradeMembershipNotFoundException {};

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
  providers: [ TradeService, TradeMembershipService ]
})
export class TradeComponent implements OnInit {
  loading: boolean = true;
  trade: Trade = new Trade();
  tradeFormGroup: FormGroup;
  tradeHref: string; // When truthy, it also means it that it should render a VIEW page
  tradeMembership: TradeMembership;
  nameFormControl: AbstractControl;
  message: Message = new Message();
  stateFormControl: AbstractControl;
  states: KeyValuePair[] = [];

  constructor( 
      private route: ActivatedRoute,
      formBuilder: FormBuilder,
      private router: Router,
      private tradeService: TradeService,
      private tradeMembershipService: TradeMembershipService,
      private userService: UserService) {
    
    this.buildForm(formBuilder);
  }

  ngOnInit() {
    this.tradeHref = this.route.snapshot.paramMap.get('tradeHref');
    if (!this.tradeHref) {
      this.loading = false;
    } else {
      this.tradeService.get(this.tradeHref)
        .then(v => {
          // Load Trade data
          this.trade = v;
          return v;
        })
        .then(v => {
          return this.fetchTradeMembership(v).then(membership => {
            this.tradeMembership = membership;
          });
        })
        .catch(e => {
          if (!(e instanceof Response && e.status == 404)) {
            this.message.setErrorItems(e);
          }
        })
        .then(() => {
          this.populateForm(this.trade, this.tradeMembership);
          this.loading = false;
        });
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
      this.states.push(new KeyValuePair(v, v));
    }
  }

  isStateDisplayable() {
    return (this.stateFormControl.value != null);
  }

  private populateForm(trade: Trade, tradeMembership: TradeMembership) {
    this.nameFormControl.setValue(trade.name);
    this.stateFormControl.setValue(trade.state);
    if (!(tradeMembership && TradeMembershipType[tradeMembership.type] == TradeMembershipType.OWNER)) {
       this.tradeFormGroup.disable();
    }
  }
  
  private nameValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && (control.value.length < 3 || control.value.length > 150)) {
      return {invalid: true};
    }
  }

  onSubscribe() {
    this.loading = true;
    this.userService.getAuthenticatedUser()
      .then(user => {
        let tradeMembership = new TradeMembership();
        tradeMembership.tradeId = this.trade.tradeId;
        tradeMembership.userId = user.userId;
        return tradeMembership;
      })
      .then(v => { 
        this.tradeMembershipService.save(v)
          .then(v => {
            this.message.setInfoItems("Subscribed.");
            this.tradeMembership = v;
            this.loading = false;
          })
          .catch(e => {
            this.message.setErrorItems(e);
            this.loading = false;      
          });
      })
  }

  onSubmit() {
    this.loading = true;
    this.trade.name = this.nameFormControl.value;
    this.trade.state = this.stateFormControl.value;
    this.tradeService.save(this.trade)
      .then(v => {
        this.trade = v;
        this.populateForm(this.trade, null);
        this.tradeFormGroup.enable();
        this.tradeFormGroup.markAsPristine();
        this.message.setInfoItems("Trade saved.");
        this.loading = false;
        return v;
      })
      .then(v => {
        this.fetchTradeMembership(v).then(membership => {
          this.tradeMembership = membership;
        })
      })
      .catch(e => {
        this.message.setErrorItems(e);
        this.tradeFormGroup.markAsPristine();
        this.loading = false;
      });
  }

  fetchTradeMembership(trade: Trade): Promise<TradeMembership> {
    return new Promise<TradeMembership>((resolve, reject) => {
      this.userService.getAuthenticatedUser()
        // Get current user
        .then(user => {
          return { tradeId: trade.tradeId, userId: user.userId };
        })
        .then(v => {
          // Search TradeMembership
          return this.tradeMembershipService.search(new Page(1, 1), v.tradeId, v.userId)
            .then(v => { resolve(v.results[0]) });
        })
        .catch(e => reject(e));
    });
  }

  onItems(): void {
    this.router.navigate(['item-list', {tradeMembershipHref: this.tradeMembership._href}]);
  }

  displaySubscribeButton(): boolean {
    return this.tradeHref && !this.tradeMembership;
  }

  displayItemsButton(): boolean {
    return (this.tradeMembership ? true : false);
  }
}
