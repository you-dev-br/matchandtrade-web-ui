import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';

import { Trade } from '../class/pojo/trade';
import { TradeTransformer } from '../class/transformer/trade-transformer';
import { Page } from '../class/search/page';
import { SearchResult } from '../class/search/search-result';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  tradeTransformer: TradeTransformer = new TradeTransformer();

  constructor(
    private http: HttpClient) { }

  find(href: string): Promise<Trade> {
    return this.http
      .get<Trade>(href)
      .pipe(catchError(this.findErrorHanlder))
      .toPromise();
  }

  findAll(page: Page): Promise<SearchResult<Trade>> {
    return this.http
      .get(this.findAllBuildUrl(page), { observe: 'response' })
      .pipe(map(response => this.findAllMapResponse(response, page)))
      .toPromise();
  }

  private findAllBuildUrl(page: Page): string {
    return `/matchandtrade-api/v1/trades?_pageNumber=${page.number}&_pageSize=${page.size}`;
  }

  private findAllMapResponse(response: HttpResponse<any>, page: Page) {
    if (response.status != 200) {
      throw new Error(`Unable to GET trades. HttpStatus: ${response.status}`);
    }
    return this.tradeTransformer.toSearchResult(response, page);
  }

  private findErrorHanlder(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `${error.status}: ${error.error.description}`;
    }
    return throwError(errorMessage);
  };
}
