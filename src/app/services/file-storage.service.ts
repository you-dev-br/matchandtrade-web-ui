import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { FileUploadStatus, FileUpload } from '../classes/pojo/file-upload';
import { HttpEventType } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Injectable()
export class FileStorageService {

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

	get(fileHref: string): Promise<FileUpload[]> {
		return new Promise<FileUpload[]>((resolve, reject) => {
			this.authenticationService.get().then(v => {
				const h = new HttpHeaders({'authorization': v.authorizationHeader});

				return this.http.get(fileHref.toLowerCase(), {headers: h, responseType: 'text'}).toPromise();
			})
			.then(v => {
				const result = new Array<FileUpload>();
				const response = JSON.parse(v);
				response.forEach(e => {
					const fileInfo = new FileUpload();
					fileInfo.fileId = e.fileId;
					const thumbnailLink = e._links.find(v => v.rel == 'thumbnail');
					fileInfo.thumbnailUrl = (thumbnailLink ? thumbnailLink.href : undefined )
					const originalLink = e._links.find(v => v.rel == 'original');
					fileInfo.url = (originalLink ? originalLink.href : undefined);
					fileInfo.status = FileUploadStatus.STORED;
					result.push(fileInfo);
				});
				resolve(result);
			})
			.catch(e => reject(e));
		});

	}


}
