import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TradeService } from '../../service/trade.service';
import { Trade } from '../../class/pojo/trade';
import { NavigationService } from '../../service/navigation.service';
import { Page } from '../../class/search/page';
import { PageEvent } from '@angular/material';
import { Pagination } from '../../class/search/pagination';
import { SearchResult } from '../../class/search/search-result';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	providers: [NavigationService]
})
export class ListComponent implements OnInit {
	trades: Trade[] = [];
	pagination: Pagination = new Pagination(1, 25);

	constructor(
		private navigationService: NavigationService,
		private tradeService: TradeService) { }

  ngOnInit() {
		// TODO: Message error!
		this.findAll();
	}
	
	private findAll() {
		this.tradeService
			.findAll(this.pagination.page)
			.then(searchResult => {
				this.trades = searchResult.results;
				this.pagination = searchResult.pagination;
			})
			.catch(e => console.log(e));
	}

	navigate(trade: Trade) {
		this.navigationService.navigate("trades/entries", trade.getHref());
	}

	onPageChange(pageEvent: PageEvent) {
		this.pagination.page.number = pageEvent.pageIndex + 1;
		this.pagination.page.size = pageEvent.pageSize;
		this.pagination.totalEntries = pageEvent.length;
		this.findAll();
	}
}
