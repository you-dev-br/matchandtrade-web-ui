import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError, } from 'rxjs/operators';

import { Trade } from '../class/pojo/trade';
import { TradeTransformer } from '../class/transformer/trade-transformer';
import { Page } from '../class/search/page';
import { SearchResult } from '../class/search/search-result';
import { AuthenticationService } from './authentication.service';
import { HttpUtil } from '../class/util/http-util';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  tradeTransformer: TradeTransformer = new TradeTransformer();

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient) { }

  async find(href: string): Promise<Trade> {
    const authorizationHeader = await this.authenticationService.obtainAuthorizationHeader();
		return this.http
			.get<Trade>(href, { headers: { 'Authorization': authorizationHeader } })
			.pipe(catchError(HttpUtil.httpErrorResponseHandler))
			.toPromise();
  }

  findAll(page: Page): Promise<SearchResult<Trade>> {
    return this.http
      .get(this.findAllBuildUrl(page), { observe: 'response' })
			.pipe(
				catchError(HttpUtil.httpErrorResponseHandler),
				map(response => this.tradeTransformer.toSearchResult(response, page))
			)
      .toPromise();
  }

  private findAllBuildUrl(page: Page): string {
    return `/matchandtrade-api/v1/trades?_pageNumber=${page.number}&_pageSize=${page.size}`;
  }
}
