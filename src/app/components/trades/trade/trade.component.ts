import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Trade } from '../../../classes/pojo/trade';
import { TradeService } from '../../../services/trade.service'

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
  providers: [ TradeService ]
})
export class TradeComponent {
  trade: Trade;

  constructor(private route: ActivatedRoute, private tradeService: TradeService) {
    route.params.subscribe(params => {
      let tradeId = params['tradeId'];
      this.trade = tradeService.get(tradeId);
    });
  }

}
