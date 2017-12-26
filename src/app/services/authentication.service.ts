import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Authentication } from '../classes/pojo/authentication';

@Injectable()
export class AuthenticationService {
  authentication: Authentication = new Authentication();

  constructor(private http: Http) { }

  public authorizationHeaders(): Promise<Headers> {
    let result = new Promise<Headers>((resolve, reject) => {
      if(this.authentication.authorizationHeader) {
        let headers = new Headers();
        headers.append('Authorization', this.authentication.authorizationHeader);
        resolve(headers);
      } else {
        this.getAuthorization().then((v) => {
          let headers = new Headers();          
          headers.append("Authorization", v.authorizationHeader);
          resolve(headers);
        }).catch((e) => reject(e));
      }
    });
    return result;
  }

  public getAuthorization(): Promise<Authentication> {
    return this.http.get('/api/authenticate/info')
      .map((response: Response) => {
        let result = new Authentication();
        result.authorizationHeader = response.json().authenticationHeader
        this.authentication.authorizationHeader = result.authorizationHeader;
        return result;
      }).toPromise();
  }

}
