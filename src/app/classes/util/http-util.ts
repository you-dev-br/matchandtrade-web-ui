import { Pagination } from '../search/pagination';
import { Page } from '../search/page';
import { Response, URLSearchParams } from '@angular/http';


export class HttpUtil {

  public static buildPagination(page: Page, response: Response) {
    let paginationTotalCount = parseInt(response.headers.get('x-pagination-total-count'));
    return new Pagination(page.number, page.size, paginationTotalCount)
  }

  public static buildPaginationParameters(page: Page, urlSearchParams?: URLSearchParams): URLSearchParams {
    let result: URLSearchParams;
    if (!urlSearchParams) {
      result = new URLSearchParams();
    } else {
      result = urlSearchParams;
    }
    result.append('_pageNumber', page.number.toString());
    result.append('_pageSize', page.size.toString());
    return result;
  }

}
