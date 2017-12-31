import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../services/authentication.service';
import { HttpService } from '../services/http.service';
import { Pagination } from '../classes/search/pagination';
import { Page } from '../classes/search/page';
import { SearchResult } from '../classes/search/search-result';
import { Trade } from '../classes/pojo/trade';
import { TradeTransformer } from '../classes/transformers/trade-transformer';

@Injectable()
export class TradeService {
  trades: Trade[] = new Array<Trade>();
  tradeTransformer = new TradeTransformer();

  constructor(private authenticationService: AuthenticationService, private http: Http, private httpService: HttpService) { }

  get(tradeId: number): Promise<Trade> {
    let result = new Promise<Trade>( (resolve, reject) => {
      this.httpService.buildRequestOptions(true).then((requestOptions) => {

        this.http.get('/api/rest/v1/trades/' + tradeId, requestOptions).map((v) => {
            return this.tradeTransformer.toPojo(v.json());
          }).subscribe(
            (v) => resolve(v),
            (e) => reject(e)
          );

      }).catch((e) => reject(e)); // end of buildRequestOptions()
    }); // end of new Promise<Trade>
    return result;
  }

  save(trade: Trade): Promise<Trade> {
    let result = new Promise<Trade>( (resolve, reject) => {
      this.httpService.buildRequestOptions(true).then((requestOptions) => {
        
        if (trade.tradeId) {
          this.http.put('/api/rest/v1/trades/' + trade.tradeId, trade, requestOptions).map((v) => {
            return this.tradeTransformer.toPojo(v.json());
          }).subscribe(
            (v) => resolve(v),
            (e) => reject(e)
          );
        } else {
          this.http.post('/api/rest/v1/trades/', trade, requestOptions).map((v) => {
            console.log('service', v.json())
            return this.tradeTransformer.toPojo(v.json());
          }).subscribe(
            (v) => resolve(v),
            (e) => reject(e)
          );          
        }

      }).catch((e) => reject(e)); // end of buildRequestOptions()
    }); // end of new Promise<Trade>
    return result;
  }

  search(page: Page, name?: string): Promise<SearchResult<Trade>> {
    let result = new Promise<SearchResult<Trade>>( (resolve, reject) => {
      this.httpService.buildRequestOptions(false, page).then((requestOptions) => {
        this.http.get('/api/rest/v1/trades', requestOptions)
          .map((v) => {
            return this.tradeTransformer.toSearchResult(v, page);
          })
          .toPromise()
          .then((v) => resolve(v))
          .catch((e) => reject(e));
      }).catch((e) => reject(e));
    });
    return result;
  }

}
