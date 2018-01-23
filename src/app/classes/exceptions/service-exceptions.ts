/**
 * Collection of exceptions to be used in service classes.
 * Basic functionalities should be a added to 'ServiceException' class and 
 * other execptions should extend it.
 */

import { Response } from '@angular/http';

export class ServiceExceptionFactory {

	public static makeException(error): ServiceException {
		let result;

		// Instanticate with the correct instance based on the Response.status or default ServiceException
		if (error instanceof Response) {
			switch(error.status) {
				case 404: {
					result = new NotFoundException(error);
					break;
				}
				default: {
					result = new ServiceException(error);
				}
			}
		}
		return result;
	}
}

export class ServiceException {
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

export class NotFoundException extends ServiceException { }
