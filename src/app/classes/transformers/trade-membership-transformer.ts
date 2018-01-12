import { Response } from '@angular/http';

import { Page } from '../search/page';
import { SearchResult } from '../search/search-result';
import { TradeMembership } from '../pojo/trade-membership';
import { Transformer } from './transformer';    

export class TradeMembershipTransformer extends Transformer<TradeMembership> {

    public toPojo(json: any): TradeMembership {
        const result = new TradeMembership();
        result._href = this.extractHref(json._links);
        result.tradeId = json.tradeId;
        result.userId = json.userId;
        return result;
    }

}
