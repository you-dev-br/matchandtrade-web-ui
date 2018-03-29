import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavigationService } from './navigation.service';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub, ActivatedRoute, NavigationServiceMock } from '../../test/router-stubs';

describe('NavigationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationService, {provide: Router, useClass: RouterStub}]
    });
  });

  it('should be created', inject([NavigationService], (service: NavigationService) => {
    expect(service).toBeTruthy();
  }));
});
