import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
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

	private buildSaveRequest(authorizationHeader: HttpHeaders, trade: Trade): HttpRequest<Trade> {
		let httpMethod = trade.getHref() ? 'PUT' : 'POST';
		let url = trade.getHref() ? trade.getHref() : '/matchandtrade-api/v1/trades/';
		return new HttpRequest<Trade>(httpMethod, url, trade, {headers: authorizationHeader});
	}

  async find(href: string): Promise<Trade> {
		const authorizationHeader = await this.authenticationService.obtainAuthorizationHeader();
		return this.http
			.get(href, { headers: authorizationHeader, observe: 'response' })
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
		const authorizationHeader: HttpHeaders = await this.authenticationService.obtainAuthorizationHeader();
		const request: HttpRequest<Trade> = this.buildSaveRequest(authorizationHeader, trade);
		return this.http
			.request(request)
			.pipe(
				catchError(HttpUtil.httpErrorResponseHandler),
				map(response => this.tradeTransformer.toPojo(response))
			)
			.toPromise();
	}
}
