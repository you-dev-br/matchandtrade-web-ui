import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsComponent } from './attachments.component';
import { By } from '@angular/platform-browser';
import { FileStorageService } from '../../services/file-storage.service';

describe('AttachmentsComponent', () => {
	
	class FileStorageServiceMock {

	}
	
	let component: AttachmentsComponent;
  let fixture: ComponentFixture<AttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			declarations: [ AttachmentsComponent ]
		})
		.overrideComponent(AttachmentsComponent, {
			set: {
				providers: [{provide: FileStorageService, useClass: FileStorageServiceMock}]
			}
		})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsComponent);
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
