import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  public getAuthorizationHeader(): Observable<string> {
    return this.http
      .get('/api/authenticate/info')
      .map((response: Response) => {
        return response.json().authenticationHeader;
      });
  }

}
