/**
 * Collection of exceptions to be used in service classes.
 * Basic functionalities should be a added to 'ServiceException' class and 
 * other execptions should extend it.
 */

import { Response } from '@angular/http';

export class ExceptionFactory {

	public static makeException(error): HttpResponseException {
		if (error instanceof Response) {
			return new HttpResponseException(error);
		} else {
			return error;
		}
	}

}

export class HttpResponseException {
	private originalError: any;
	private errorString: string;

	constructor(error: any) {
		this.originalError = error;
		this.errorString = this.parseError(error);
	}

	private parseError(error: any): string {
		let result;
		if (error instanceof Response) {
			const e = <Response> error;
			try {
				let responseDescription = e.json().description;
				if (responseDescription) {
					result = responseDescription;
				} else {
					result = e.statusText;
				}
				if (e.text) {
					result += ": " + e.text;
				}
			} catch(ex) {
				result = e.toString();
			}
		} else {
			result = error.toString();
		}
		return result;		
	}
	
	public toString(): string {
		return this.errorString;
	}

}