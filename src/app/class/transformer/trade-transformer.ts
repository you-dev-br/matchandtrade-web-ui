import { Trade } from '../pojo/trade';
import { Transformer } from './transformer';

export class TradeTransformer extends Transformer<Trade>{
  toPojo(json: any): Trade {
    const result = new Trade();
    result.links = this.buildLinks(json._links);
    result.description = json.description;
    result.name = json.name;
    result.tradeId = json.tradeId;
    return result;
  }
}
