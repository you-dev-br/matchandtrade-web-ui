import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FileStorageService } from './file-storage.service';
import { AuthenticationService } from './authentication.service';
import { HttpClient} from '@angular/common/http';
import { Http } from '@angular/http';

describe('FileStorageService', () => {

	class AuthenticationServiceMocked {

	}


  beforeEach(() => {
    TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [FileStorageService, 
				{provide: AuthenticationService, useClass: AuthenticationServiceMocked }
			],
		});
  });

  fit('should be created', inject([FileStorageService], (service: FileStorageService) => {
    expect(service).toBeTruthy();
  }));
});
