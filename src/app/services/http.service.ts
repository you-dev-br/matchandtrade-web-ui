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
      let result = new Promise<RequestOptions>((resolve, reject) => {
        this.authenticationService.authHeaders().then((v) => {
          let requestOptions = new RequestOptions();
          requestOptions.headers = v;
          requestOptions.params = new URLSearchParams();
          HttpService.addPageParametersToUrlSearchParms(requestOptions.params, page);
          resolve(requestOptions);
        }).catch((e) => reject(e));
      });
      return result;
    } else {
      let result = new Promise<RequestOptions>((resolve, reject) => {
        let requestOptions = new RequestOptions();
        requestOptions.params = new URLSearchParams();
        HttpService.addPageParametersToUrlSearchParms(requestOptions.params, page);
        resolve(requestOptions);
      });
      return result;
    }
  }

  private static addPageParametersToUrlSearchParms(searchParams: URLSearchParams, page: Page) {
    searchParams.append('_pageNumber', page.number.toString());
    searchParams.append('_pageSize', page.size.toString());
  }

}