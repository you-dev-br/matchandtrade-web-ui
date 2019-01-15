import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AppError } from '../app-error';

export class HttpUtil {
  public static httpErrorResponseHandler(e: HttpErrorResponse) {
    let result: AppError;
    if (e.status) {
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
      result = new AppError(errorText, e.status);
    } else {
      result = new AppError(`Client error: ${e.message}`);
    }
    return throwError(result);
  }
}
