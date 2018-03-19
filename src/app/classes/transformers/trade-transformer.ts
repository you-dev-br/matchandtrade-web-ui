import { Response } from '@angular/http';

import { Page } from '../search/page';
import { SearchResult } from '../search/search-result';
import { Trade } from '../pojo/trade';
import { Transformer } from './transformer';

export class TradeTransformer extends Transformer<Trade> {

    public toPojo(json: any): Trade {
        const result = new Trade();
        result._href = this.extractHref(json._links);
        result.name = json.name;
        result.tradeId = json.tradeId;
        //TODO fix the state to be a valid TradeState reference. Also fix trade.component-view.spec.ts
        result.state = json.state;
        return result;
    }

}
