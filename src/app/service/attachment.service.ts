import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Attachment } from '../class/attachment';
import { KeyValue } from '@angular/common';
import { AttachmentTransformer } from '../class/transformer/attachment-transformer';
import { catchError, map } from 'rxjs/operators';
import { HttpUtil } from '../class/common/http-util';

@Injectable({
  providedIn: 'root'
})
/**
 * Inspired by this excellent tutorial: https://malcoded.com/posts/angular-file-upload-component-with-express
 */
export class AttachmentService {
  private attachmentTransformer = new AttachmentTransformer();

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient) { }

  async delete(href: string): Promise<void> {
    const authorizationHeaders = await this.authenticationService.obtainAuthorizationHeaders();
    return this.http
      .delete(href, {headers: authorizationHeaders, observe: 'response'})
      .pipe(
        catchError(HttpUtil.httpErrorResponseHandler),
        map(() => {})
      )
      .toPromise();
  }

  async findAttachmentsByHref(href: string): Promise<Attachment[]> {
    const authorizationHeaders = await this.authenticationService.obtainAuthorizationHeaders();
    return this.http
      .get(href, {headers: authorizationHeaders, observe: 'response'})
      .pipe(
        catchError(HttpUtil.httpErrorResponseHandler),
        map(response => this.attachmentTransformer.toPojos(response))
      )
      .toPromise();
  }

  upload(file: File): Observable<KeyValue<Attachment, number>> {
    // Create a new subject which will be our result
    const progress = new Subject<KeyValue<Attachment, number>>();
    this.authenticationService.obtainAuthorizationHeaders().then(authorizationHeader => {
      // Create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      // Create a http-post request and pass the form tell it to report the upload progress
      const request = new HttpRequest('POST', '/matchandtrade-api/v1/attachments', formData, { reportProgress: true, headers: authorizationHeader });
      // Send the http-request and subscribe for progress-updates
      this.http.request(request).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // inform the progress percentage
          const percentDone = Math.round((100 * event.loaded) / event.total);
          progress.next({key: undefined, value: percentDone});
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if upload is complete
          const attachment = this.attachmentTransformer.toPojo(event);
          progress.next({key: attachment, value: 100});
          progress.complete();
        }
      });
    })
    .catch(e => progress.error(e));
    return progress;
  }
}