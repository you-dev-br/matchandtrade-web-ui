import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * Inspired by this excellent tutorial: https://malcoded.com/posts/angular-file-upload-component-with-express
 */
export class AttachmentService {
  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient) { }

  public async upload(file: File): Promise<Observable<number>> {
    const authorizationHeader: HttpHeaders = await this.authenticationService.obtainAuthorizationHeaders();
    // Create a new multipart-form for every file
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    // Create a http-post request and pass the form tell it to report the upload progress
    const request = new HttpRequest('POST', '/matchandtrade-api/v1/attachments', formData, { reportProgress: true, headers: authorizationHeader });
    // Create a new progress-subject for every file
    const progress = new Subject<number>();
    // Send the http-request and subscribe for progress-updates
    this.http.request(request).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        // inform the progress percentage
        const percentDone = Math.round((100 * event.loaded) / event.total);
        progress.next(percentDone);
      } else if (event instanceof HttpResponse) {
        // Close the progress-stream if upload is complete
        progress.complete();
      }
    });
    // Save every progress-observable
    return Promise.resolve(progress);
  }
}