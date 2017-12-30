import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { AuthenticationService } from '../services/authentication.service';
import { Pagination } from '../classes/search/pagination';
import { Page } from '../classes/search/page';
import { TradeTransformer } from '../classes/transformers/trade-transformer';
import { SearchResult } from '../classes/search/search-result';
import { Trade } from '../classes/pojo/trade';

@Injectable()
export class HttpService {

  constructor(private authenticationService: AuthenticationService, private http: Http) { }

  public buildRequestOptions(authorized?: boolean, page?: Page): Promise<RequestOptions> {
    if(authorized == true) {
      return new Promise<RequestOptions>((resolve, reject) => {
        this.authenticationService.authorizationHeaders().then((v) => {
          let requestOptions = HttpService.buildPaginatedRequestOptions(page);
          requestOptions.headers = v;
          resolve(requestOptions);
        }).catch((e) => reject(e));
      });
    } else {
      return new Promise<RequestOptions>((resolve, reject) => {
        resolve(HttpService.buildPaginatedRequestOptions(page));
      });
    }
  }

  private static buildPaginatedRequestOptions(page?: Page): RequestOptions {
    let result = new RequestOptions();
    result.params = new URLSearchParams();
    if (page) {
      result.params.append('_pageNumber', page.number.toString());
      result.params.append('_pageSize', page.size.toString());
    }
    return result;
  }

}