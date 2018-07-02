import { Response } from '@angular/http';

import { Page } from '../search/page';
import { SearchResult } from '../search/search-result';
import { TradeMembership, TradeMembershipType } from '../pojo/trade-membership';
import { Transformer } from './transformer';    

export class TradeMembershipTransformer extends Transformer<TradeMembership> {

    public toPojo(json: any): TradeMembership {
        const result = new TradeMembership();
        result.links = this.buildLinks(json._links);
        result.tradeMembershipId = json.tradeMembershipId;
        result.tradeId = json.tradeId;
        result.userId = json.userId;
        result.type = TradeMembershipType[TradeMembershipType[json.type]];
        return result;
    }

}
