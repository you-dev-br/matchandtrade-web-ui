import { Component, OnInit } from '@angular/core';
import { TradeService } from '../../service/trade.service';
import { Trade } from '../../class/pojo/trade';
import { NavigationService } from '../../service/navigation.service';
import { Page } from '../../class/search/page';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
	providers: [NavigationService]
})
export class ListComponent implements OnInit {
	trades: Trade[] = [];

	constructor(
		private navigationService: NavigationService,
		private tradeService: TradeService) { }

  ngOnInit() {
		const page: Page = new Page(1, 20);
		this.tradeService
			.findAll(page)
			.then(v => this.trades = v)
			.catch(e => console.log(e));
	}
	
	navigate(trade: Trade) {
		this.navigationService.navigate("trades/entries", trade.name);
	}
}
