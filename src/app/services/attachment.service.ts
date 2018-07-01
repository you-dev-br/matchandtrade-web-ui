import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx'
import { AttachmentTransformer } from '../classes/transformers/attachment-transformer';
import { Attachment, AttachmentStatus } from '../classes/pojo/attachment';

@Injectable()
export class AttachmentService {

	attachmentTransformer = new AttachmentTransformer();

  constructor(private http: HttpClient, private authenticationService: AuthenticationService ) { }

	get(attachmentHref: string): Promise<Attachment[]> {
		return new Promise<Attachment[]>((resolve, reject) => {
			this.authenticationService.authorizationHttpHeaders().then(v => {
				return this.http.get(attachmentHref, {headers: v, responseType: 'text'}).toPromise();
			})
			.then(v => {
				const result = new Array<Attachment>();
				const response = JSON.parse(v);
				response.forEach(e => {
          const attachment = this.attachmentTransformer.toPojo(e);
          attachment.status = AttachmentStatus.STORED;
					result.push(attachment);
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
			const request = new HttpRequest('POST', "/matchandtrade-web-api/v1/attachments/", formData, {
				headers: v,
				reportProgress: true,
				responseType: 'text'
			});
			return this.http.request(request);
		});
	}

}
