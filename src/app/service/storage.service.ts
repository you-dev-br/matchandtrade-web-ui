import { Injectable } from '@angular/core';

enum LocalStorageKey {
	AUTHENTICATION='AUTHENTICATION',
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
	deleteAuthentication(): void {
		localStorage.removeItem(LocalStorageKey.AUTHENTICATION);
	}

	findAuthentication(): string {
		const authenticationAsString = localStorage.getItem(LocalStorageKey.AUTHENTICATION);
		return JSON.parse(authenticationAsString);
	}

	saveAuthentication(authentication: string): void {
		localStorage.setItem(LocalStorageKey.AUTHENTICATION, JSON.stringify(authentication));
	}
}
