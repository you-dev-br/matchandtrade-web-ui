import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { FileTransformer } from '../classes/transformers/file-transformer';
import { HttpEventType } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { FilePojo } from '../classes/pojo/file-pojo';

@Injectable()
export class FileService {

	fileTransformer = new FileTransformer();

  constructor(private http: HttpClient, private authenticationService: AuthenticationService ) { }

	get(fileHref: string): Promise<FilePojo[]> {
		return new Promise<FilePojo[]>((resolve, reject) => {
			this.authenticationService.authorizationHttpHeaders().then(v => {
				return this.http.get(fileHref, {headers: v, responseType: 'text'}).toPromise();
			})
			.then(v => {
				const result = new Array<FilePojo>();
				const response = JSON.parse(v);
				response.forEach(e => {
					const filePojo = this.fileTransformer.toPojo(e);
					result.push(filePojo);
				});
				resolve(result);
			})
			.catch(e => reject(e));
		});
	}

	save(file: File): Observable<HttpEvent<{}>> {
		return Observable.fromPromise(this.authenticationService.authorizationHttpHeaders()).flatMap(v => {
			const formData = new FormData();
			formData.append('file', file);
			const request = new HttpRequest('POST', "/matchandtrade-web-api/v1/files/", formData, {
				headers: v,
				reportProgress: true,
				responseType: 'text'
			});
			return this.http.request(request);
		});
	}

}
