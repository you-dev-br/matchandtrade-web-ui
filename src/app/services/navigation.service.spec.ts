import { TestBed, inject } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { AuthenticationService } from './authentication.service';
import { Authentication } from '../classes/pojo/authentication';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { ActivatedRouteMock } from '../../test/router-mock';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from './storage.service';

describe('navigation.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([{path: 'test-path', redirectTo: ''}])],
			providers: [NavigationService, StorageService]
		})
	});
	
	const routeMock = new ActivatedRouteMock();

	it('should navigate with data', inject([NavigationService], (service: NavigationService) => {
		const testingParam = {testProperty: 'testingValue'};
		const testingParamAsSafeBase64 = NavigationService.encodeToSafeBase64(JSON.stringify(testingParam));
		spyOn(service, 'getSnapshotParam').and.callFake(v => {
			return testingParamAsSafeBase64;
		});
		service.navigate('test-path', testingParam);
		const testingParamObtained = service.obtainData(null);
		expect(testingParam).toEqual(testingParamObtained);
  }));

	it('should get navigation message', inject([NavigationService], (service: NavigationService) => {
		localStorage.clear();
		expect(service.getNavigationMessage()).toBeNull();
		service.setNavigationMessage('testing');
		expect(service.getNavigationMessage().text).toBe('testing');
  }));


});
