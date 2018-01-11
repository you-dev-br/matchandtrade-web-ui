import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Authentication } from '../classes/pojo/authentication';
import { AuthenticationTransformer } from '../classes/transformers/authentication-transformer';

@Injectable()
export class AuthenticationService {
  private lastAuthentication: Authentication;
  private authenticationTransformer = new AuthenticationTransformer();

  constructor(private http: Http) { }

  public authorizationHeaders(): Promise<Headers> {
    return new Promise<Headers>((resolve, reject) => {
      this.get()
        .then(v => {
          let headers = new Headers();          
          headers.append("Authorization", v.authorizationHeader);
          resolve(headers);
        })
        .catch(e => reject(e));
    });
  }

  public get(): Promise<Authentication> {
    if (this.lastAuthentication) {
      return new Promise<Authentication>((resolve, reject) =>
        resolve(this.lastAuthentication)
      );
    } else {
      return this.http
        .get('/api/authenticate/info')
        .map(v => {
          let result = this.authenticationTransformer.toPojo(v.json());
          this.lastAuthentication = result;
          return result;
        })
        .toPromise();
    }
  }

}
