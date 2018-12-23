import { Page } from '../search/page';
import { Pagination } from '../search/pagination';
import { SearchResult } from '../search/search-result';
import { Link } from '../pojo/link';
import { HttpResponse } from '@angular/common/http';

export abstract class Transformer<T> {
  private buildPagination(page: Page, response: HttpResponse<any>) {
    let paginationTotalCount = parseInt(response.headers.get('x-pagination-total-count'));
    return new Pagination(page.number, page.size, paginationTotalCount)
  }

  public buildLinks(links: any): Link[] {
    let result: Link[] = [];
    if (links) {
      for (let link of links) {
        const rel = Object.getOwnPropertyNames(link)[0];
        const href = link[rel];
        result.push(new Link(rel, href));
      }
    }
    return result;
  }

  public abstract toPojo(json: any): T;

  public toPojos(list: any): T[] {
    const result = [];
    for (let i = 0; i < list.length; i++) {
      result.push(this.toPojo(list[i]));
    }
    return result;
  }

  public toSearchResult(response: HttpResponse<any>, page: Page): SearchResult<T> {
    let pagination = this.buildPagination(page, response);
    let results = this.toPojos(response.body);
    return new SearchResult<T>(results, pagination);
  }
}
