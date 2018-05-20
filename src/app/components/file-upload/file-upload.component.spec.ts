import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { By } from '@angular/platform-browser';
import { FileStorageService } from '../../services/file-storage.service';

describe('FileUploadComponent', () => {
	
	class FileStorageServiceMock {

	}
	
	let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			declarations: [ FileUploadComponent ]
		})
		.overrideComponent(FileUploadComponent, {
			set: {
				providers: [{provide: FileStorageService, useClass: FileStorageServiceMock}]
			}
		})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should select file', () => {
		const fileInput: HTMLInputElement = fixture.debugElement.query(By.css('.file-input')).nativeElement;
		const file = new File([new ArrayBuffer(12345)], 'file-upload-component-spec.png');
		fileInput.accept = 'asdf';
		fileInput.files.item[0] = file;
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			// fileInput.dispatchEvent(new Event('change'));
		// 	expect(component.files).toBeDefined();
		});
	});
	


	
});
