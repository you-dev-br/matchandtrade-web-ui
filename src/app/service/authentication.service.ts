import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { HttpUtil } from '../class/util/http-util';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
	private authorizationHeader: string;
	private userId: number;

  constructor(
    private storageService: StorageService,
    private http: HttpClient) { }

  authorize(): Promise<string> {
    return this.http
      .get('/matchandtrade-api/v1/authenticate/info', { observe: 'response' })
      .pipe(catchError(HttpUtil.httpErrorResponseHandler), map(this.authorizeMap))
      .toPromise();
  }

  private authorizeMap(response: HttpResponse<any>): string {
    this.authorizationHeader = response.body['authenticationHeader'];
    return this.authorizationHeader;
  }

  async obtainAuthorizationHeader(): Promise<HttpHeaders> {
    // Try to get if from memory
    if (!this.authorizationHeader) {
      // If is not in memomry; then find in local storage
      this.authorizationHeader = this.storageService.findAuthentication();
      // If is not is local storate; then try getting from the server
      if (!this.authorizationHeader) {
        this.authorizationHeader = await this.authorize();
      }
    }
    this.storageService.saveAuthentication(this.authorizationHeader);
    const headers = new HttpHeaders({'Authorization': this.authorizationHeader});
    return Promise.resolve(headers);
	}
	
	async obtainUserId(): Promise<number> {
		// Try to get if from memory
		if (!this.userId) {
			// If is not in memomry; then find in local storage
      this.userId = this.storageService.findUserId();
			// If is not is local storate; then try getting from the server
			if (!this.userId) {
				this.userId = await this.findUserId();
			}
		}
		this.storageService.saveUserId(this.userId);
		return this.userId;
	}

	private async findUserId(): Promise<number> {
		const authorizationHeader = await this.obtainAuthorizationHeader();
    return this.http
      .get('matchandtrade-api/v1/authentications/', { headers: authorizationHeader })
      .pipe(catchError(HttpUtil.httpErrorResponseHandler), map(this.findUserIdMap))
      .toPromise();
	}

	private findUserIdMap(response: HttpResponse<any>): number {
    return response['userId'];
	}
}
