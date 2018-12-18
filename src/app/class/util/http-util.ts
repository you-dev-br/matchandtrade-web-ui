import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class HttpUtil {
	public static httpErrorResponseHandler(error: HttpErrorResponse) {
		let errorMessage;
		if (error.status && error.status > 100) {
      errorMessage = `${error.status}: ${error.error.error}`;			
		} else {
			errorMessage = `Client error: ${error.message}`;
		}
    return throwError(errorMessage);
  };
}
