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

  get(href: string): Promise<Trade> {
    return new Promise<Trade>( (resolve, reject) => {
      this.httpService
        .getWithDefaultOptions(href)
        .then(v => resolve(this.tradeTransformer.toPojo(v.json())))
        .catch(err => reject(err));
    });
  }  

  save(trade: Trade): Promise<Trade> {
    let result = new Promise<Trade>( (resolve, reject) => {
      this.httpService.buildRequestOptions(true).then((requestOptions) => {
        
        if (trade._href) {
          this.http.put(trade._href, trade, requestOptions).map((v) => {
            return this.tradeTransformer.toPojo(v.json());
          }).subscribe(
            (v) => resolve(v),
            (e) => reject(e)
          );
        } else {
          this.http.post('/api/rest/v1/trades/', trade, requestOptions).map((v) => {
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
    return new Promise<SearchResult<Trade>>( (resolve, reject) => {
      this.httpService
        .getWithDefaultOptions('/api/rest/v1/trades', false)
        .then(o => resolve(this.tradeTransformer.toSearchResult(o, page)))
        .catch(err => reject(err));
    });
  }

}
