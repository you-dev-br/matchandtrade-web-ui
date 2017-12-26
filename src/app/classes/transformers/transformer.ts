import { Response } from '@angular/http';

import { Page } from '../search/page';
import { Pagination } from '../../classes/search/pagination';
import { SearchResult } from '../search/search-result';
import { Trade } from '../pojo/trade';

export abstract class Transformer<T> {

    public toSearchResult(response: Response, page: Page): SearchResult<T> {
        let pagination = this.buildPagination(page, response);
        let results = this.toPojos(response.json());
        return new SearchResult<T>(results, pagination);
    }

    private buildPagination(page: Page, response: Response) {
        let paginationTotalCount = parseInt(response.headers.get('x-pagination-total-count'));
        return new Pagination(page.number, page.size, paginationTotalCount)
    }

    public abstract toPojo(json: any): T;
    public abstract toPojos(list: any): Array<T>;
}
