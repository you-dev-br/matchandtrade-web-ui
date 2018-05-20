import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'

@Injectable()
export class FileStorageService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService ) { }

	save(url: string, file: File): Observable<HttpEvent<{}>> {
		return Observable.fromPromise(this.authenticationService.get())
			.flatMap(v => {
				const formData = new FormData();
				formData.append('file', file);
				const headers = new HttpHeaders({'authorization': v.authorizationHeader});
				const request = new HttpRequest('POST', url, formData, {
					headers: headers,
					reportProgress: true,
					responseType: 'text'
				});
				return this.http.request(request);
			});
	}

}
