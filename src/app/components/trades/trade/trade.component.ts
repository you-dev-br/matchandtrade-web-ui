import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RouteAction } from '../../../classes/route/route-action';
import { Trade } from '../../../classes/pojo/trade';
import { TradeService } from '../../../services/trade.service'
import { Erratum } from '../../../classes/pojo/erratum';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss'],
  providers: [ TradeService ]
})
export class TradeComponent {
  loading: boolean = true;
  errata = new Array<Erratum>();
  trade: Trade = new Trade();
  validationMessage = {
    tradeName: null
  };
  validationStyle = {
    tradeName: "help is-clear"
  };

  constructor(private route: ActivatedRoute, private tradeService: TradeService) {
    let tradeId = route.snapshot.params['tradeId'];
    if (tradeId == RouteAction.CREATE) {
      this.loading = false;
    } else {
      this.tradeService.get(tradeId).then((v) => {
        this.trade = v;
        this.loading = false;
      }).catch((e) => this.errata.push(new Erratum(e)));
    }
  }

  saveTrade(tradeName: HTMLInputElement) {
    this.errata.length = 0;
    this.trade.name = tradeName.value;
    this.tradeService.save(this.trade).then((v) => {
      Object.assign(this.trade, v);
    }).catch((e) => {
      this.errata.push(new Erratum(e));
    });
  }

  triggerValidation(s: HTMLInputElement) {
    if (s.id = 'trade-name') {
      this.trade.name = s.value;
      if (s.value && s.value.length > 3 && s.value.length < 150) {
        this.validationMessage.tradeName = null;
        this.validationStyle.tradeName = "help is-clear";
      } else {
        this.validationMessage.tradeName = "Trade name is mandatory and its length must be between 3 and 150.";
        this.validationStyle.tradeName = "help is-danger";
      }
    }
  }

}
