import { TestBed, inject } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { AuthenticationService } from './authentication.service';
import { Authentication } from '../classes/pojo/authentication';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { ActivatedRouteMock } from '../../test/router-mock';
import { ActivatedRoute } from '@angular/router';

describe('NavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [RouterTestingModule.withRoutes([{path: 'test-path', redirectTo: ''}])],
			providers: [NavigationService]
		})
	});
	
	const routeMock = new ActivatedRouteMock();

	it('should navigate with data', inject([NavigationService], (service: NavigationService) => {
		const testingParam = {testProperty: 'testingValue'};
		const testingParamAsSafeBase64 = NavigationService.encodeToSafeBase64(JSON.stringify(testingParam));
		spyOn(service, 'getSnapshotParam').and.callFake(v => {
			return testingParamAsSafeBase64;
		});
		service.navigateWithData('test-path', testingParam);
		const testingParamObtained = service.obtainData(null);
		expect(testingParam).toEqual(testingParamObtained);
  }));

});
