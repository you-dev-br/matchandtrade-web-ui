import { Response } from '@angular/http';

import { Page } from '../search/page';
import { SearchResult } from '../search/search-result';
import { Trade } from '../pojo/trade';
import { Transformer } from './transformer';    

export class TradeTransformer extends Transformer<Trade> {

    public toPojo(json: any): Trade {
        let result = new Trade();
        result.name = json.name;
        result.tradeId = json.tradeId;
        return result;
    }

    public toPojos(list: any): Array<Trade> {
        let result = new Array<Trade>();
        for (let i = 0; i < list.length; i++) {
            result.push(this.toPojo(list[i]));
        }
        return result;
    }

}
