import { Component, OnInit } from '@angular/core';
import { TradeService } from '../../service/trade.service';
import { Trade } from '../../pojo/trade';
import { NavigationService } from '../../service/navigation.service';

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
		this.trades = this.tradeService.findAll();
	}
	
	navigate(trade: Trade) {
		this.navigationService.navigate("trades/entries", trade.name);
	}
}
