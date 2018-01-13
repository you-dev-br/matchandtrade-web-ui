import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams, RequestOptionsArgs } from '@angular/http';

import { AuthenticationService } from '../services/authentication.service';
import { Pagination } from '../classes/search/pagination';
import { Page } from '../classes/search/page';
import { TradeTransformer } from '../classes/transformers/trade-transformer';
import { SearchResult } from '../classes/search/search-result';
import { Trade } from '../classes/pojo/trade';
import { Observable } from 'rxjs/Observable';
import { KeyValuePair } from '../classes/pojo/key-value-pair';

export enum HttpMethod {POST='POST', PUT='PUT'};

@Injectable()
export class HttpService {

  constructor(private authenticationService: AuthenticationService, private http: Http) { }

  /**
   * Build RequestOptions.
   * If truthy <code>page</code>, then it will add pagination query parameters.
   * If <code>authorized</code> is true (or not present), then it will add appropriated <code>Authorization</code> headers.
   * @param authorized 
   * @param page 
   */
  public buildRequestOptions(page?: Page, authorized?: boolean, params?: Array<KeyValuePair>): Promise<RequestOptions> {
    let shouldAuthenticate = authorized;
    if (authorized == undefined || authorized == null) {
      shouldAuthenticate = true;
    }
    if(shouldAuthenticate == true) {
      return new Promise<RequestOptions>((resolve, reject) => {
        this.authenticationService.authorizationHeaders()
          .then((v) => {
            let requestOptions = HttpService.buildPaginatedRequestOptions(page);
            this.appendParameters(requestOptions, params);
            requestOptions.headers = v;
            resolve(requestOptions);
          })
          .catch((e) => reject(e));
      });
    } else {
      return new Promise<RequestOptions>((resolve, reject) => {
        resolve(HttpService.buildPaginatedRequestOptions(page));
      });
    }
  }

  private appendParameters(requestOptions: RequestOptions, params: Array<KeyValuePair>) {
    if (params) {
      params.forEach(v => {
        requestOptions.params.append(v.key, v.value);
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

  /**
   * Performs a request with `get` http method.
   * It is an authenticated request by default.
   */
  public get(url: string, authenticated?: boolean, page?: Page, params?: Array<KeyValuePair>): Promise<Response>{
    return new Promise<Response>((resolve, reject) => {
      this.buildRequestOptions(page, authenticated, params).then(o => {
        this.http.get(url, o).subscribe(r => resolve(r), e => reject(e));
      });
    });
  }
  
  /**
   * Performs a request with `post` http method.
   * It is an authenticated request by default.
   */
  public post(url: string, body?: any, authenticated?: boolean): Promise<Response>{
    return this.putOrPost(HttpMethod.POST, url, body, authenticated);
  }

  /**
   * Performs a request with `put` http method.
   * It is an authenticated request by default.
   */
  public put(url: string, body?: any, authenticated?: boolean): Promise<Response>{
    return this.putOrPost(HttpMethod.PUT, url, body, authenticated);
  }

  private putOrPost(method: HttpMethod, url: string, body?: any, authenticated?: boolean): Promise<Response>{
    return new Promise<Response>((resolve, reject) => {
      this.buildRequestOptions(undefined, authenticated).then(o => {
        if (method === HttpMethod.PUT) {
          this.http.put(url, body, o).subscribe(r => resolve(r), e => reject(e));
        } else if (method === HttpMethod.POST) {
          this.http.post(url, body, o).subscribe(r => resolve(r), e => reject(e));
        } else {
          reject(new Error('Unknown http request method ' + method));
        }
      });
    });
  }
  
}
