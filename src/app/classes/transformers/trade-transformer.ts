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
        result.state = json.state;
        return result;
    }

}
