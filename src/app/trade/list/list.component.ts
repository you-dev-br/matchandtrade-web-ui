import { Component, OnInit } from '@angular/core';
import { TradeService } from '../../service/trade.service';
import { Trade } from '../../class/pojo/trade';
import { NavigationService } from '../../service/navigation.service';
import { PageEvent } from '@angular/material';
import { Pagination } from '../../class/search/pagination';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	providers: [NavigationService]
})
export class ListComponent implements OnInit {
	errorMessage: string;
	isLoading: boolean = true;
	pagination: Pagination = new Pagination(1, 25);
	trades: Trade[] = [];

	constructor(
		private navigationService: NavigationService,
		private tradeService: TradeService) { }

  ngOnInit() {
		this.findAll();
	}
	
	private findAll() {
		this.tradeService
			.findAll(this.pagination.page)
			.then(searchResult => {
				this.trades = searchResult.results;
				this.pagination = searchResult.pagination;
			})
			.catch(e => this.errorMessage = e)
			.then(() => this.isLoading = false);
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
