import { Response } from '@angular/http';
import { Trade } from '../pojo/trade';
import { HttpUtil } from '../../classes/util/http-util';
import { Page } from '../search/page';
import { SearchResult } from '../search/search-result';

export class TradeTransformer {

    public static toPojo(json: any): Trade {
        let result = new Trade();
        result.name = json.name;
        result.tradeId = json.tradeId;
        return result;
    }

    public static toPojos(list: any): Array<Trade> {
        let result = new Array<Trade>();
        for (let i = 0; i < list.length; i++) {
            result.push(this.toPojo(list[i]));
        }
        return result;
    }

    public static toSearchResult(response: Response, page: Page): SearchResult<Trade> {
        let pagination = HttpUtil.buildPagination(page, response);
        let trades = TradeTransformer.toPojos(response.json());
        return new SearchResult<Trade>(trades, pagination);
    }

}
