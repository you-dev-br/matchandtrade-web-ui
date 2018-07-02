import { Response } from '@angular/http';

import { Page } from '../search/page';
import { Pagination } from '../../classes/search/pagination';
import { SearchResult } from '../search/search-result';
import { Trade } from '../pojo/trade';
import { Link } from '../pojo/link';

export abstract class Transformer<T> {

    private buildPagination(page: Page, response: Response) {
        let paginationTotalCount = parseInt(response.headers.get('x-pagination-total-count'));
        return new Pagination(page.number, page.size, paginationTotalCount)
    }

    public buildLinks(links: any): Link[] {
      return (links ? links : new Array<Link>());
    }

    public extractHref(_links: any): string {
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

    public abstract toPojo(json: any): T;

    public toPojos(list: any): Array<T> {
        const result = new Array<T>();
        for (let i = 0; i < list.length; i++) {
            result.push(this.toPojo(list[i]));
        }
        return result;
    }

    public toSearchResult(response: Response, page: Page): SearchResult<T> {
        let pagination = this.buildPagination(page, response);
        let results = this.toPojos(response.json());
        return new SearchResult<T>(results, pagination);
    }

}
