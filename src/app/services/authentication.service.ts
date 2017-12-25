import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Authentication } from '../classes/pojo/authentication';

@Injectable()
export class AuthenticationService {
  authentication: Authentication = new Authentication();

  constructor(private http: Http) { }

  public authorizationOptions(): Promise<RequestOptions> {
    if(this.authentication.authorizationHeader) {
      return new Promise<RequestOptions>((resolve, reject) => {
        resolve(this.buildRequestOptions(this.authentication.authorizationHeader));
      });
    } else {
      return new Promise<RequestOptions>((resolve, reject) => {
        this.getAuthorization()
          .then((authentication) => {
            resolve(this.buildRequestOptions(authentication.authorizationHeader));
          })
          .catch((e) => reject(e));
      });
    }
  }

  public buildRequestOptions(authorizationHeader: string): RequestOptions {
    let headers = new Headers();
    headers.append('Authorization', authorizationHeader);
    let requestOptions = new RequestOptions();
    requestOptions.headers = headers;
    return requestOptions;
  }

  public getAuthorization(): Promise<Authentication> {
    return this.http
      .get('/api/authenticate/info')
      .map((response: Response) => {
        let result = new Authentication();
        result.authorizationHeader = response.json().authenticationHeader
        return result;
      })
      .toPromise()
      .then((v) => {
        this.authentication.authorizationHeader = v.authorizationHeader;
        return this.authentication;
      })
      .then();
  }

}
