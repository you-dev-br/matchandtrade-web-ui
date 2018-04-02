import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Authentication } from '../classes/pojo/authentication';
import { AuthenticationTransformer } from '../classes/transformers/authentication-transformer';
import { StorageService } from './storage.service';

@Injectable()
export class AuthenticationService {
  private authenticationTransformer = new AuthenticationTransformer();

  constructor(private http: Http, private storageService: StorageService) { }

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

  public isSignedIn(): boolean {
		return this.storageService.getAuthentication() ? true : false;
  }

  public get(): Promise<Authentication> {
    if (this.storageService.getAuthentication()) {
      return new Promise<Authentication>((resolve, reject) =>
        resolve(this.storageService.getAuthentication())
      );
    } else {
      return this.http
        .get('/matchandtrade-web-api/v1/authenticate/info')
        .map(v => {
          let result = this.authenticationTransformer.toPojo(v.json());
          this.storageService.setAuthentication(result);
          return result;
        })
        .toPromise();
    }
  }

  public signOut(): Promise<boolean> {
		this.storageService.removeAuthentication();
    return new Promise<boolean>((resolve, reject) => {
      this.http
        .get('/matchandtrade-web-api/v1/authenticate/sign-out')
        .subscribe(r => {
          resolve(true);
        }, e => resolve(e));
    });
	}
	
}
