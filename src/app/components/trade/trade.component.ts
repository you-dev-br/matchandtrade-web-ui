import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { KeyValuePair } from '../../classes/pojo/key-value-pair';
import { Message, MessageType } from '../../components/message/message';
import { NavigationService } from '../../services/navigation.service';
import { Page } from '../../classes/search/page';
import { SearchResult } from '../../classes/search/search-result';
import { Trade, TradeState } from '../../classes/pojo/trade';
import { TradeMembership, TradeMembershipType } from '../../classes/pojo/trade-membership';
import { TradeMembershipService } from '../../services/trade-membership.service';
import { TradeService } from '../../services/trade.service';
import { UserService } from '../../services/user.service';
import { TradeTransformer } from '../../classes/transformers/trade-transformer';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
  providers: [ TradeService, TradeMembershipService ]
})
export class TradeComponent implements OnInit {
  loading: boolean = true;
  descriptionFormControl: AbstractControl;
  message: Message = new Message();
  nameFormControl: AbstractControl;
  stateFormControl: AbstractControl;
  states: KeyValuePair[] = [];
  trade: Trade = new Trade();
  tradeFormGroup: FormGroup;
  tradeHref: string; // When truthy, it also means it that it should render a VIEW page
  tradeMembership: TradeMembership;
  tradeTransformer = new TradeTransformer()

  constructor( 
      private route: ActivatedRoute,
      formBuilder: FormBuilder,
      private router: Router,
      private navigationService: NavigationService,
      private tradeService: TradeService,
      private tradeMembershipService: TradeMembershipService,
      private userService: UserService) {
    
    this.buildForm(formBuilder);
  }

  ngOnInit() {
    this.tradeHref = this.navigationService.obtainData(this.route).tradeHref;
    if (!this.tradeHref) {
      this.loading = false;
    } else {
      this.tradeService.get(this.tradeHref)
        .then(v => {
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
			'description': ['',Validators.compose([this.descriptionValidator])],
			'name': ['',Validators.compose([Validators.required, this.nameValidator])],
      'state': []
		});
		this.descriptionFormControl = this.tradeFormGroup.controls['description'];
    this.nameFormControl = this.tradeFormGroup.controls['name'];
    this.stateFormControl = this.tradeFormGroup.controls['state'];
		// We do not want the user to be able to set the state as "Results Generated" nor "Results Generated", this status should only be valid when it is coming from the server.
    for(let v in TradeState) {
			if (v != TradeState.GENERATING_RESULTS && v != TradeState.RESULTS_GENERATED) {
				this.states.push(new KeyValuePair(v, this.tradeTransformer.toStateText(v)));
			}
    }
	}
	
  private descriptionValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && (control.value.length < 3 || control.value.length > 1000)) {
      return {invalid: true};
    }
  }

  isStateDisplayable() {
    return (this.stateFormControl.value != null);
  }

  private populateForm(trade: Trade, tradeMembership: TradeMembership) {
		// If state is "Results Generated" or "Generating Results" then let's add it to the states so the user can see the current state propertly
    if (trade.state == TradeState.RESULTS_GENERATED || trade.state == TradeState.GENERATING_RESULTS ) {
			this.states.push(new KeyValuePair(trade.state, this.tradeTransformer.toStateText(trade.state)));
		}
    this.stateFormControl.setValue(trade.state);
		this.nameFormControl.setValue(trade.name);
		this.descriptionFormControl.setValue(trade.description);
    if (!(tradeMembership && TradeMembershipType[tradeMembership.type] == TradeMembershipType.OWNER)) {
      this.tradeFormGroup.disable();
    }
  }
  
  private nameValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && (control.value.length < 3 || control.value.length > 150)) {
      return {invalid: true};
    }
  }

  sanitizeName() {
    this.nameFormControl.setValue(this.nameFormControl.value.trim());
    this.nameFormControl.setValue(this.nameFormControl.value.replace(/\n/g, ''));
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
		this.sanitizeName();
		this.trade.description = this.descriptionFormControl.value;
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
				/*
				 * This is a very elusive problem when it comes to navigation. Imagine the navigation scenario:
				 * create trades > items list > create items > save item (which navigates back to items list) > navigate back
				 * In the above scenario, router will navigate back to "Create Trade Page" but we want it go navigate back to
				 * "The current trade". Hence I am adding the extra navigation below so angular's router pushes the 
				 * 'tradeHref' to the path and pushing it to the browsers history.
				 */
				this.navigationService.navigate('trades',  {tradeHref: v._href}, true);
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
    this.navigationService.navigate('item-list', {tradeMembershipHref: this.tradeMembership._href});
  }
  
  onMatchItems(): void {
    this.navigationService.navigate('item-matcher-list', {tradeMembershipHref: this.tradeMembership._href});
  }

	onResults(): void {
    this.navigationService.navigate('trade-result', {tradeHref: this.trade._href});
	}
	
  displaySubscribeButton(): boolean {
    return this.tradeHref && !this.tradeMembership && this.trade.state == TradeState.SUBMITTING_ITEMS;
  }

  displayMatchItemsButton(): boolean {
    return this.tradeMembership && this.trade.state == TradeState.MATCHING_ITEMS;
  }

  displayItemsButton(): boolean {
    return this.tradeMembership && this.trade.state == TradeState.SUBMITTING_ITEMS;
	}
	
	displayResultsButton(): boolean {
    return this.trade.state == TradeState.RESULTS_GENERATED;
  }
  
  navigateBack() {
    this.navigationService.back();
  }
}
