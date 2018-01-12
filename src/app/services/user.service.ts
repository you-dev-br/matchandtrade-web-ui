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

    // TODO need to use users endpoint instead of authentication
    return new Promise<User>( (resolve, reject) => {
      this.httpService
        .get('/api/rest/v1/authentications/')
        .then(v => {
          let result = new User();
          result.userId = v.json().userId;
          resolve(result);
        })
        .catch(e => reject(e));
    });
  }

}
