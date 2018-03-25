import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../services/http.service';
import { Pagination } from '../classes/search/pagination';
import { Page } from '../classes/search/page';
import { SearchResult } from '../classes/search/search-result';
import { TradeMembership } from '../classes/pojo/trade-membership';
import { TradeMembershipTransformer } from '../classes/transformers/trade-membership-transformer';
import { KeyValuePair } from '../classes/pojo/key-value-pair';

@Injectable()
export class TradeMembershipService {
  transformer = new TradeMembershipTransformer();
  constructor(private httpService: HttpService) { }

  search(page: Page, tradeId?: number, userId?: number): Promise<SearchResult<TradeMembership>> {
    let params = new Array<KeyValuePair>();
    params.push(new KeyValuePair('tradeId', tradeId));
    params.push(new KeyValuePair('userId', userId));

    return new Promise<SearchResult<TradeMembership>>( (resolve, reject) => {
      this.httpService.get('/matchandtrade-web-api/v1/trade-memberships', true, page, params)
        .then(v => 
          resolve(this.transformer.toSearchResult(v, page))
        )
        .catch(e => reject(e));
    });
  }

  get(href: string) {
    return new Promise<TradeMembership>((resolve, reject) => {
      this.httpService.get(href)
      .then(v =>
        resolve(this.transformer.toPojo(v.json()))
      )
      .catch(e => reject(e));
    });
  }

  save(tradeMembership: TradeMembership): Promise<TradeMembership> {
    return new Promise( (resolve, reject) => {
      this.httpService
        .post('/matchandtrade-web-api/v1/trade-memberships/', tradeMembership)
        .then(v =>
          resolve(this.transformer.toPojo(v.json()))
        )
        .catch(e => reject(e));
    });
  }

}
