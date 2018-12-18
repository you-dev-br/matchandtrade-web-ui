import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
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
			.get(href, { headers: authorizationHeader })
			.pipe(
				catchError(HttpUtil.httpErrorResponseHandler),
				map(response => this.tradeTransformer.toPojo(response))
			)
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

	async save(trade: Trade): Promise<Trade> {
		const authorizationHeader = await this.authenticationService.obtainAuthorizationHeader();
		const request = new HttpRequest<Trade>('PUT', trade.getHref(), trade, { headers: authorizationHeader });
		return this.http
			.request(request)
			.pipe(
				catchError(HttpUtil.httpErrorResponseHandler),
				map(response => this.tradeTransformer.toPojo(response))
			)
			.toPromise();
	}
}
