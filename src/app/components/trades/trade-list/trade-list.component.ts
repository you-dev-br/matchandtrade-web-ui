import { Component } from '@angular/core';

import { TradeService } from '../../../services/trade.service';
import { Trade } from '../../../pojo/trade';

@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.scss'],
  providers: [TradeService]
})
export class TradeListComponent {
  trades:Trade[];

  constructor(private tradeService: TradeService) {
    this.trades = tradeService.getTrades();
  }

}
