import { Injectable } from '@angular/core';

enum LocalStorageKey {
  AUTHENTICATION='AUTHENTICATION',
  USER_ID='USER_ID',
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  deleteAuthentication(): void {
    localStorage.removeItem(LocalStorageKey.AUTHENTICATION);
  }

  deleteUserId(): void {
    localStorage.removeItem(LocalStorageKey.USER_ID);
  }

  findAuthentication(): string {
    return localStorage.getItem(LocalStorageKey.AUTHENTICATION);
  }

  findUserId(): number {
    const userIdFromStorage = localStorage.getItem(LocalStorageKey.USER_ID);
    if (userIdFromStorage) {
      return Number.parseInt(userIdFromStorage);
    }
    return null;
  }

  saveAuthentication(authentication: string): void {
    localStorage.setItem(LocalStorageKey.AUTHENTICATION, authentication);
  }

  saveUserId(userId: number): void {
    localStorage.setItem(LocalStorageKey.USER_ID, userId.toString());
  }
}
