import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { HttpUtil } from '../class/util/http-util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authorizationHeader: string;

  constructor(
		private storageService: StorageService,
		private http: HttpClient) {console.log('Authentication service constructor!') }

  authorize(): Promise<string> {
    return this.http
      .get('/matchandtrade-api/v1/authenticate/info', {observe: 'response'})
      .pipe(catchError(HttpUtil.httpErrorResponseHandler), map(this.authorizeMap))
      .toPromise();
  }
  
  private authorizeMap(response: HttpResponse<any>): string {
      this.authorizationHeader = response.body['authenticationHeader'];
			console.log('map', this.authorizationHeader);
			return this.authorizationHeader;
  }

  async obtainAuthorizationHeader(): Promise<string> {
		// Try to get if from memory for fast performance
    if (!this.authorizationHeader) {
			// If is not in memomry; then find in local storage
			this.authorizationHeader = this.storageService.findAuthentication();
			// If is not is local storate; then try getting from the server
			if (!this.authorizationHeader) {
				this.authorizationHeader = await this.authorize();
			}
    }
		this.storageService.saveAuthentication(this.authorizationHeader);
    return this.authorizationHeader;
  }
}
