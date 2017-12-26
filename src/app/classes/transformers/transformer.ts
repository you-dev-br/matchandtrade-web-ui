import { Response } from '@angular/http';

import { Page } from '../search/page';
import { Pagination } from '../../classes/search/pagination';
import { SearchResult } from '../search/search-result';
import { Trade } from '../pojo/trade';

export abstract class Transformer {

    public toSearchResult(response: Response, page: Page): SearchResult<Trade> {
        let pagination = this.buildPagination(page, response);
        let trades = this.toPojos(response.json());
        return new SearchResult<Trade>(trades, pagination);
    }

    private buildPagination(page: Page, response: Response) {
        let paginationTotalCount = parseInt(response.headers.get('x-pagination-total-count'));
        return new Pagination(page.number, page.size, paginationTotalCount)
    }

    public abstract toPojo(json: any): Trade;
    public abstract toPojos(list: any): Array<Trade>;
}
