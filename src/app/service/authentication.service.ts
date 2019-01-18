import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { HttpUtil } from '../class/common/http-util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authorizationHeaderInMemory: string;
  private userIdInMemory: number;

  constructor(
    private storageService: StorageService,
    private http: HttpClient) { }

  private findAuthenticationInfo(): Promise<string> {
    return this.http
      .get('/matchandtrade-api/v1/authenticate/info', { observe: 'response' })
      .pipe(catchError(HttpUtil.httpErrorResponseHandler), map(this.findAuthenticationInfoMap))
      .toPromise();
  }

  private findAuthenticationInfoMap(response: HttpResponse<any>): string {
    this.authorizationHeaderInMemory = response.body['authorizationHeader'];
    return this.authorizationHeaderInMemory;
  }

  private async findUserId(): Promise<number> {
    const authorizationHeaders = await this.obtainAuthorizationHeaders();
    return this.http
      .get('matchandtrade-api/v1/authentications/', { headers: authorizationHeaders })
      .pipe(catchError(HttpUtil.httpErrorResponseHandler), map(this.findUserIdMap))
      .toPromise();
  }

  private findUserIdMap(response: HttpResponse<any>): number {
    return response['userId'];
  }

  isAuthenticated(): boolean {
    if (this.authorizationHeaderInMemory && this.authorizationHeaderInMemory.length > 0) {
      return true;
    } else {
      return !!this.storageService.findAuthentication();
    }
  }

  async obtainAuthorizationHeaders(): Promise<HttpHeaders> {
    // Try to get if from memory
    if (!this.authorizationHeaderInMemory) {
      // If is not in memomry; then find in local storage
      this.authorizationHeaderInMemory = this.storageService.findAuthentication();
      // If is not is local storate; then try getting from the server
      if (!this.authorizationHeaderInMemory) {
        try {
          this.authorizationHeaderInMemory = await this.findAuthenticationInfo();
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }
    this.storageService.saveAuthentication(this.authorizationHeaderInMemory);
    const headers = new HttpHeaders({'Authorization': this.authorizationHeaderInMemory});
    return Promise.resolve(headers);
  }
  
  async obtainUserId(): Promise<number> {
    // Try to get if from memory
    if (!this.userIdInMemory) {
      // If is not in memomry; then find in local storage
      this.userIdInMemory = this.storageService.findUserId();
      // If is not is local storate; then try getting from the server
      if (!this.userIdInMemory) {
        this.userIdInMemory = await this.findUserId();
      }
    }
    this.storageService.saveUserId(this.userIdInMemory);
    return this.userIdInMemory;
  }

  async singOff(): Promise<void> {
    try {
      let headers: HttpHeaders = await this.obtainAuthorizationHeaders();
      this.http.get('matchandtrade-api/v1/authenticate/sign-off', { headers: headers });
      return;
    } catch (e) {
      console.log('Unable get authorization header, attempting to sign-off without it');
      this.http.get('matchandtrade-api/v1/authenticate/sign-off').toPromise();
    } finally {
      this.authorizationHeaderInMemory = undefined;
      this.storageService.deleteAuthentication();
      this.userIdInMemory = undefined;
      this.storageService.deleteUserId();
    }
  }
}
