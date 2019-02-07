import { Page } from '../search/page';
import { Pagination } from '../search/pagination';
import { SearchResult } from '../search/search-result';
import { Link } from '../pojo/link';
import { HttpResponse } from '@angular/common/http';

export abstract class Transformer<T> {
  buildBasePojo(anyObject: any): any {
		let result = anyObject;
    if (anyObject instanceof HttpResponse) {
      result = anyObject.body;
		}
		return result;
	}

  private buildPagination(page: Page, response: HttpResponse<any>) {
    let header: string = response.headers.get('x-pagination-total-count');
    return new Pagination(page.number, page.size, parseInt(header));
  }

  buildLinks(links: any): Link[] {
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

  static obtainKeyFromEnumeration(value: string, enumeration: any) {
    const enumerationKeys = Object.keys(enumeration);
    for (let i = 0; i < enumerationKeys.length; i++) {
      const enumKey = enumerationKeys[i];
      const enumValue = enumeration[enumKey];
      if (enumValue == value) {
        return enumValue;
      }
    };
    return undefined;
  }

  abstract toPojo(json: any): T;

  toPojos(anyList: any): T[] {
    const result = [];
    let list = anyList;
    if (anyList instanceof HttpResponse) {
      list = anyList.body;
    }
    for (let i = 0; i < list.length; i++) {
      result.push(this.toPojo(list[i]));
    }
    return result;
  }

  toSearchResult(response: HttpResponse<any>, page: Page): SearchResult<T> {
    let pagination = this.buildPagination(page, response);
    let results = this.toPojos(response.body);
    return new SearchResult<T>(results, pagination);
  }
}
