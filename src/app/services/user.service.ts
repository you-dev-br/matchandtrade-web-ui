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
import { User } from '../classes/pojo/user';

@Injectable()
export class UserService {
  constructor(private authenticationService: AuthenticationService, private http: Http, private httpService: HttpService) { }

  getAuthenticatedUser(): Promise<User> {
    let result = new Promise<User>( (resolve, reject) => {
      this.httpService.buildRequestOptions(true).then((requestOptions) => {

        this.http.get('/api/rest/v1/authentications/', requestOptions).map((v) => {
            let result = new User();
            result.userId = v.json().userId;
            return result;
          }).subscribe(
            (v) => resolve(v),
            (e) => reject(e)
          );

      }).catch((e) => reject(e)); // end of buildRequestOptions()
    }); // end of new Promise<Trade>
    return result;
  }  

}
