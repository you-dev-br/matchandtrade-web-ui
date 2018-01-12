import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../services/authentication.service';
import { HttpService } from '../services/http.service';
import { Pagination } from '../classes/search/pagination';
import { Page } from '../classes/search/page';
import { SearchResult } from '../classes/search/search-result';
import { TradeMembership } from '../classes/pojo/trade-membership';
import { TradeMembershipTransformer } from '../classes/transformers/trade-membership-transformer';

@Injectable()
export class TradeMembershipService {
  transformer = new TradeMembershipTransformer();
  constructor(private httpService: HttpService) { }

  search(page: Page, tradeId?: string): Promise<SearchResult<TradeMembership>> {
    return new Promise<SearchResult<TradeMembership>>( (resolve, reject) => {
      this.httpService
        .get('/api/rest/v1/trades', false)
        .then(v => resolve(this.transformer.toSearchResult(v, page)))
        .catch(e => reject(e));
    });
  }

  save(tradeMembership: TradeMembership): Promise<TradeMembership> {
    return new Promise( (resolve, reject) => {
      this.httpService
        .post('/api/rest/v1/trade-memberships/', tradeMembership)
        .then(v => {
          resolve(this.transformer.toPojo(v.json()));
        })
        .catch(e => reject(e));
    });
  }

}
