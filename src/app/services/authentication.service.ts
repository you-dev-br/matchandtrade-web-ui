import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Authentication } from '../classes/pojo/authentication';

import { AUTHORIZATION_HEADER_OBSERVABLE, AUTHORIZATION_HEADER_SUBJECT } from '../classes/state/global-state';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  public getAuthorization(): Observable<Authentication> {
    this.http
      .get('/api/authenticate/info')
      .map((response: Response) => {
        return response.json().authenticationHeader;
      })
      .subscribe((v) => {
        let a = new Authentication();
        a.authorizationHeader = v;
        this.getUserId(v);
      });
    return AUTHORIZATION_HEADER_OBSERVABLE;
  }

 private getUserId(authorizationHeader: string): void {
    let headers = new Headers();
    headers.append('Authorization', authorizationHeader);
    let requestOptions = new RequestOptions();
    requestOptions.headers = headers;

    this.http
      .get('/api/rest/v1/authentications/', requestOptions)
      .map((response: Response) => {
        return response.json().userId;
      })
      .subscribe((v) => {
        let authentication = new Authentication();
        authentication.authorizationHeader = authorizationHeader;
        authentication.userId = v;
        AUTHORIZATION_HEADER_SUBJECT.next(authentication);
      });
  }  

}
