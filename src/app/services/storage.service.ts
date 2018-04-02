import { Injectable } from '@angular/core';
import { Authentication } from '../classes/pojo/authentication';

enum LocalStorageKey {
	AUTHENTICATION_TOKEN='AUTHENTICATION_TOKEN',
	AUTHENTICATION='AUTHENTICATION'
}

@Injectable()	
export class StorageService {

	constructor() { }

	setAuthentication(authentication: Authentication): void {
		localStorage.setItem(LocalStorageKey.AUTHENTICATION, JSON.stringify(authentication));
	}

	getAuthentication(): Authentication {
		const authenticationAsString = localStorage.getItem(LocalStorageKey.AUTHENTICATION);
		return JSON.parse(authenticationAsString);
	}

	removeAuthentication(): void {
		localStorage.removeItem(LocalStorageKey.AUTHENTICATION);
	}
}
