import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { AuthenticationService } from './authentication.service';
import { Authentication } from '../classes/pojo/authentication';
import { StorableMessage } from '../components/message/storable-message';
import { MessageType } from '../components/message/message';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
		});
		localStorage.clear();
  });

	it('should persist authentication', inject([StorageService], (service: StorageService) => {
		const expectedAuthentication = new Authentication('testing-authentication-header');
		service.setAuthentication(expectedAuthentication);
		expect(localStorage.length).toBe(1);
		const actualAuthentication: Authentication = service.getAuthentication();
		expect(actualAuthentication.authorizationHeader).toBe(expectedAuthentication.authorizationHeader);
	}));
	
	it('should remove authentication', inject([StorageService], (service: StorageService) => {
		const expectedAuthentication = new Authentication('testing-authentication-header');
		service.setAuthentication(expectedAuthentication);
		expect(localStorage.length).toBe(1);
		service.removeAuthentication();
		expect(localStorage.length).toBe(0);
  }));

	it('should set navigation.message of a string object', inject([StorageService], (service: StorageService) => {
		service.setNavigationMessage("testing");
		expect(localStorage.length).toBe(1);
  }));

	it('should set navigation.message of an object', inject([StorageService], (service: StorageService) => {
		service.setNavigationMessage('testing');
		expect(localStorage.length).toBe(1);
  }));

});
