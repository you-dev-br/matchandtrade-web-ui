import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { AuthenticationService } from './authentication.service';
import { Authentication } from '../classes/pojo/authentication';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
  });

	it('should persist authentication', inject([StorageService], (service: StorageService) => {
		localStorage.clear();
		expect(localStorage.length).toBe(0);
		const expectedAuthentication = new Authentication('testing-authentication-header');
		service.setAuthentication(expectedAuthentication);
		expect(localStorage.length).toBe(1);
		const actualAuthentication: Authentication = service.getAuthentication();
		expect(actualAuthentication.authorizationHeader).toBe(expectedAuthentication.authorizationHeader);
	}));
	
	it('should remove authentication', inject([StorageService], (service: StorageService) => {
		localStorage.clear();
		expect(localStorage.length).toBe(0);
		const expectedAuthentication = new Authentication('testing-authentication-header');
		service.setAuthentication(expectedAuthentication);
		expect(localStorage.length).toBe(1);
		service.removeAuthentication();
		expect(localStorage.length).toBe(0);
  }));

});
