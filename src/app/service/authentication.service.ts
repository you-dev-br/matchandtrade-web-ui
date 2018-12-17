import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authorizationHeader: string;

  constructor(private http: HttpClient) { }

  authorize(): Promise<string> {
    return this.http
      .get('/matchandtrade-api/v1/authenticate/info', {observe: 'response'})
      .pipe(catchError(this.authorizeErrorHandler), map(this.authorizeMap))
      .toPromise();
  }
  
  authorizeMap(response: HttpResponse<any>): string {
      this.authorizationHeader = response.body['authenticationHeader'];
      return this.authorizationHeader;
  }

  authorizeErrorHandler(error: HttpErrorResponse) {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `${error.status}: ${error.statusText}`;
    }
    return throwError(errorMessage);
  }
}
