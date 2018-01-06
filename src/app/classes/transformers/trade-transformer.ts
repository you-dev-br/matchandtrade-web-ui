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

    public toPojos(list: any): Array<Trade> {
        const result = new Array<Trade>();
        for (let i = 0; i < list.length; i++) {
            result.push(this.toPojo(list[i]));
        }
        return result;
    }

    private extractHref(_links: any): string {
        let result;
        if (_links) {
            _links.forEach(v => {
                if (v.rel == 'self') {
                    result = v.href;
                }
            });
        }
        return result;
    }

}
