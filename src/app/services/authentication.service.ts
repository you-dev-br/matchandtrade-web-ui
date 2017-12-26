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
    let result = new Promise<Headers>((resolve, reject) => {
      if(this.lastAuthentication) {
        let headers = new Headers();
        headers.append('Authorization', this.lastAuthentication.authorizationHeader);
        resolve(headers);
      } else {
        this.get().then((v) => {
          let headers = new Headers();          
          headers.append("Authorization", v.authorizationHeader);
          resolve(headers);
        }).catch((e) => reject(e));
      }
    });
    return result;
  }

  public get(): Promise<Authentication> {
    if (this.lastAuthentication) {
      return new Promise<Authentication>((resolve, reject) => {
        resolve(this.lastAuthentication);
      });
    } else {
      return this.http.get('/api/authenticate/info')
        .map((response: Response) => {
          this.lastAuthentication = this.authenticationTransformer.toPojo(response.json());
          return this.lastAuthentication;
        }).toPromise();
    }
  }

}
