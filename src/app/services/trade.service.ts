import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Trade } from '../classes/pojo/trade';
import { SearchResult } from '../classes/search/search-result';
import { Pagination } from '../classes/search/pagination';
import { AuthenticationService } from '../services/authentication.service';
import { URLSearchParams } from '@angular/http';
import { TradeTransformer } from '../classes/transformers/trade-transformer';
import { HttpUtil } from '../classes/util/http-util';
import { Page } from '../classes/search/page';

@Injectable()
export class TradeService {
  trades: Trade[] = new Array<Trade>();

  constructor(private authenticationService: AuthenticationService, private http: Http) { }

  get(tradeId: number): Promise<Trade> {
    let result = new Promise<Trade>( (resolve, reject) => {
      this.authenticationService.authorizationOptions().then((requestOptions) => {
        this.http.get('/api/rest/v1/trades/' + tradeId, requestOptions)
          .map((v) => {
            console.log('service', v);
            return TradeTransformer.toPojoFromJson(v.json());
          })
          .subscribe((v) => resolve(v));
      })
    });
    return result;
  }

  search(page: Page, name?: string): Promise<SearchResult<Trade>> {
    let result = new Promise<SearchResult<Trade>>( (resolve, reject) => {
      this.authenticationService.authorizationOptions().then((requestOptions) => {
        requestOptions.params = HttpUtil.buildPaginationParameters(page);
        
        this.http.get('/api/rest/v1/trades', requestOptions)
          .map((v) => {
            let pagination = HttpUtil.buildPagination(page, v);
            let trades = TradeTransformer.toPojosFromList(v.json());
            return new SearchResult<Trade>(trades, pagination);
          })
          .toPromise()
          .then((v) => resolve(v))
          .catch((e) => reject(e));

      })
    });
    return result;
  }

}
