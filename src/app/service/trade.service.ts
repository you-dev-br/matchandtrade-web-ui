import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';

import { Trade } from '../class/pojo/trade';
import { TradeTransformer } from '../class/transformer/trade-transformer';
import { Page } from '../class/search/page';
import { SearchResult } from '../class/search/search-result';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  tradeTransformer: TradeTransformer = new TradeTransformer();

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient) { }

  find(href: string): Promise<Trade> {
		// TODO: Simplify this by checking if is authenticated.
    return this.authenticationService
      .obtainAuthorizationHeader()
      .then(authorizationHeader => {
        return this.http
					.get<Trade>(href, {headers: {'Authorization': authorizationHeader}})
					.pipe(catchError(this.httpErrorResponseHandler))
					.toPromise();
      });
  }

  findAll(page: Page): Promise<SearchResult<Trade>> {
    return this.http
      .get(this.findAllBuildUrl(page), { observe: 'response' })
			.pipe(
				catchError(this.httpErrorResponseHandler),
				map(response => this.tradeTransformer.toSearchResult(response, page))
			)
      .toPromise();
  }

  private findAllBuildUrl(page: Page): string {
    return `/matchandtrade-api/v1/trades?_pageNumber=${page.number}&_pageSize=${page.size}`;
  }

  private httpErrorResponseHandler(error: HttpErrorResponse) {
		let errorMessage;
		if (error.status && error.status > 100) {
      errorMessage = `${error.status}: ${error.error.error}`;			
		} else {
			errorMessage = `Client error: ${error.message}`;
		}
    return throwError(errorMessage);
  };
}
