import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { FileUploadStatus, FileUpload } from '../classes/pojo/file-upload';
import { FileTransformer } from '../classes/transformers/file-transformer';
import { HttpEventType } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { FilePojo } from '../classes/pojo/file-pojo';

@Injectable()
export class FileStorageService {

	fileTransformer = new FileTransformer();

  constructor(private http: HttpClient, private authenticationService: AuthenticationService ) { }

	save(file: File): Observable<HttpEvent<{}>> {
		return Observable.fromPromise(this.authenticationService.get())
			.flatMap(v => {
				const formData = new FormData();
				formData.append('file', file);
				const headers = new HttpHeaders({'authorization': v.authorizationHeader});
				const request = new HttpRequest('POST', "/matchandtrade-web-api/v1/files/", formData, {
					headers: headers,
					reportProgress: true,
					responseType: 'text'
				});
				return this.http.request(request);
			});
	}

	get(fileHref: string): Promise<FilePojo[]> {
		return new Promise<FilePojo[]>((resolve, reject) => {
			this.authenticationService.get().then(v => {
				const h = new HttpHeaders({'authorization': v.authorizationHeader});
				return this.http.get(fileHref, {headers: h, responseType: 'text'}).toPromise();
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


}
