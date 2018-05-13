import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { Message } from '../message/message';
import { NavigationService } from '../../services/navigation.service';
import { Pagination } from '../../classes/search/pagination';
import { TradeService } from '../../services/trade.service';
import { Trade, TradeState } from '../../classes/pojo/trade';
import { TradeTransformer } from '../../classes/transformers/trade-transformer';
import { TradeMembershipService } from '../../services/trade-membership.service';
import { Page } from '../../classes/search/page';
import { TradeMembershipType } from '../../classes/pojo/trade-membership';
import { User } from '../../classes/pojo/user';
import { UserService } from '../../services/user.service';

class TradeProxy {
	_href: string;
  tradeId: number = null;
  name: string = null;
	state: TradeState = null;
	statusText: string = null;
  organizerName: string = null;
  tradeMembershipType: TradeMembershipType = null;
}
@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  providers: [TradeService, TradeMembershipService, UserService]
})
export class TradeListComponent {
  authenticatedUser: User = null;
  loading: boolean = true;
  message: Message = new Message();
  pagination: Pagination;
	trades: TradeProxy[];
	tradeTransformer: TradeTransformer = new TradeTransformer();

  constructor(
			private router: Router, 
			private navigationService: NavigationService, 
			private tradeService: TradeService, 
			private tradeMembershipService: TradeMembershipService,
			private userService: UserService) {
    this.pagination = new Pagination(1, 10, 0);
    this.userService.getAuthenticatedUser()
			.then(v => this.authenticatedUser = v)
			.catch(e => console.log('User not authenticated. Continue normally.'))
			.then(() => this.search())
			.catch(e => this.message.setErrorItems(e));
  }

  createTrade() {
    this.navigationService.navigate('trades');
	}
	
	private loadProxy(trade: Trade): TradeProxy {
		const result = new TradeProxy();
		Object.assign(result, trade);
		result.statusText = this.tradeTransformer.toStateText(trade.state);

		// Load organizer data only if the current user is an authenticated user
		if (this.authenticatedUser) {
			this.tradeMembershipService.search(new Page(1, 1), trade.tradeId, undefined, TradeMembershipType.OWNER)
				.then(v => this.userService.get(v.results[0].userId))
				.then(v => result.organizerName = v.name)
				.then(() => {
					this.tradeMembershipService.search(new Page(1,1), trade.tradeId, this.authenticatedUser.userId)
						.then(membership => {
							if (membership.results.length > 0) {
								result.tradeMembershipType = membership.results[0].type;
							}
						});
				})
				.catch(e => {
					console.log('Unable to get owner of Trade.tradeId: ' + trade.tradeId)
				});
		}
		return result;
  }
  
  isOwner(trade: TradeProxy):boolean {
    return trade.tradeMembershipType == TradeMembershipType.OWNER;
  }

  isMember(trade: TradeProxy):boolean {
    return trade.tradeMembershipType == TradeMembershipType.MEMBER;
  }

	private loadProxies(trades: Trade[]): TradeProxy[] {
		const result = new Array<TradeProxy>();
		trades.forEach(v => {
			result.push(this.loadProxy(v));
		});
		return result;
	}

  navigateToTrade(trade: TradeProxy) {
    this.navigationService.navigate('trades', {tradeHref: trade._href});
	}
	
	goToPage(pageNumber: number) {
		this.pagination.page.number = pageNumber;
		this.loading = true;
		this.search();
	}

  search(): void {
    this.tradeService.search(this.pagination.page)
      .then((v) => {
        this.trades = this.loadProxies(v.results);
        this.pagination = v.pagination;
        this.loading = false;
      }).catch((e) => {
        this.loading = false;
        this.message.setErrorItems(e);
      });
	}

}
