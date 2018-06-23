import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentsComponent } from './attachments.component';
import { By } from '@angular/platform-browser';
import { AttachmentService } from '../../services/attachment.service';
import { AttachmentThumbnailComponent } from '../attachment-thumbnail/attachment-thumbnail.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';

describe('AttachmentsComponent', () => {
	
	class AttachmentServiceMock {
	}
	
	let component: AttachmentsComponent;
  let fixture: ComponentFixture<AttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			declarations: [ AttachmentsComponent, AttachmentThumbnailComponent, ImageModalComponent ]
		})
		.overrideComponent(AttachmentsComponent, {
			set: {
				providers: [{provide: AttachmentService, useClass: AttachmentServiceMock}]
			}
		})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should select file', () => {
		// const fileInput: HTMLInputElement = fixture.debugElement.query(By.css('.file-input')).nativeElement;
		// const file = new File([new ArrayBuffer(12345)], 'file-upload-component-spec.png');
		// fileInput.accept = 'asdf';
		// fileInput.files.item[0] = file;
		// fixture.detectChanges();
		// fixture.whenStable().then(() => {
		// 	fixture.detectChanges();
		// 	// fileInput.dispatchEvent(new Event('change'));
		// // 	expect(component.files).toBeDefined();
		// });
	});
	


	
});
