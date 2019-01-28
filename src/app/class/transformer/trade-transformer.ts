import { Trade, TradeState } from '../pojo/trade';
import { Transformer } from './transformer';
import { HttpResponse } from '@angular/common/http';

export class TradeTransformer extends Transformer<Trade>{
  toPojo(anyObject: any): Trade {
    let pojo = anyObject;
    if (anyObject instanceof HttpResponse) {
      pojo = anyObject.body;
    }
    const result = new Trade();
    result.links = this.buildLinks(pojo._links);
    result.description = pojo.description;
    result.name = pojo.name;
    result.tradeId = pojo.tradeId;
    result.state = Transformer.obtainKeyFromEnumeration(pojo.state, TradeState);
    return result;
  }
}
