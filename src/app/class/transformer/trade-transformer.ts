import { Trade, TradeState } from '../pojo/trade';
import { Transformer } from './transformer';
import { HttpResponse } from '@angular/common/http';

export class TradeTransformer extends Transformer<Trade>{
  toPojo(trade: any): Trade {
    let json = trade;
    if (trade instanceof HttpResponse) {
      json = trade.body;
    }
    const result = new Trade();
    result.links = this.buildLinks(json._links);
    result.description = json.description;
    result.name = json.name;
    result.tradeId = json.tradeId;
    result.state = TradeState[String(json.state)];
    return result;
  }
}
