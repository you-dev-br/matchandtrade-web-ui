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
import { UserService } from '../../services/user.service';

class TradeProxy {
	_href: string;
  tradeId: number = null;
  name: string = null;
	state: TradeState = null;
	statusText = null;
	organizer = null;
}
@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  providers: [TradeService, TradeMembershipService, UserService]
})
export class TradeListComponent {
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
    this.search();
  }

  createTrade() {
    this.navigationService.navigate('trades');
	}
	
	private loadProxy(trade: Trade): TradeProxy {
		const result = new TradeProxy();
		Object.assign(result, trade);
		result.statusText = this.tradeTransformer.toStateText(trade.state);
		this.tradeMembershipService.search(new Page(1, 1), trade.tradeId, undefined, TradeMembershipType.OWNER)
			.then(v => this.userService.get(v.results[0].userId))
			.then(v => result.organizer = v.name)
			.catch(e => {
				console.log('Unable to get owner of Trade.tradeId: ' + trade.tradeId)
			});
		return result;
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

  nextPage() {
      this.pagination.page.number++;
      this.loading = true;
      this.search();
	}
	
  previousPage() {
      this.pagination.page.number--;
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
