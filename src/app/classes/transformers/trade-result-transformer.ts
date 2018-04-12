import { TradeResult } from '../pojo/trade-result';
import { Transformer } from './transformer';

export class TradeResultTransformer extends Transformer<TradeResult> {

    public toPojo(json: any): TradeResult {
      let result = new TradeResult();
      Object.assign(result, json);
      return result;
    }

}
