import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class HttpUtil {
  public static httpErrorResponseHandler(e: HttpErrorResponse) {
    let errorMessage;
    if (e.status && e.status > 100) {
      let errorText;
      if (e.error && e.error.message) {
        errorText = e.error.message;
      } else if (e.error && e.error.description) {
        errorText = e.error.description;
      } else if (e.message) {
        errorText = e.message;
      } else {
        errorText = "Unknown error";
			}
			const errorStatus = e.statusText ? e.statusText : e.status;
      errorMessage = `${errorStatus}: ${errorText}`;
    } else {
      errorMessage = `Client error: ${e.message}`;
    }
    return throwError(errorMessage);
  };
}
