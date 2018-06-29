import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Attachment, AttachmentStatus } from '../../classes/pojo/attachment';
import { AttachmentsComponent } from './attachments.component';
import { AttachmentService } from '../../services/attachment.service';
import { AttachmentThumbnailComponent } from '../attachment-thumbnail/attachment-thumbnail.component';
import { By } from '@angular/platform-browser';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { Link } from '../../classes/pojo/link';

class FileUtil {
  public static makeBlobFromBase64(b64Data: string, contentType: string): Blob {
    const byteCharacters = atob(b64Data);
    let byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], {type: contentType});
  }
}

describe('AttachmentsComponent', () => {
	
	class AttachmentServiceMock {}

  class FileListMock {
    length = 1;
    constructor(private file: any) {}
    item(n: number): any {
      return this.file;
    }
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
    component.canUpload = true;
    component.align = 'align-center';
    component.canDelete = true;
    component.attachments = new Array<Attachment>();
    fixture.detectChanges();
  });

  it('should emit attachments when input file changes', () => {
    // Add an attachment to the component
    const fileName = 'attachments.component.spec.jpg';
    const fileContentType = 'image/jpg';
    const attachment = new Attachment();
    attachment.attachmentId = 99;
    attachment.name = fileName;
    attachment.contentType = fileContentType;
    component.attachments.push(attachment);

    // Mock the input file
    const input: HTMLInputElement = fixture.debugElement.query(By.css('.file-input')).nativeElement;
    const blob = FileUtil.makeBlobFromBase64('', fileContentType);
    const file = new File([blob], fileName, {type: fileContentType});
    spyOnProperty(input, 'files', 'get').and.returnValue(new FileListMock(file));
    
    // Mock the input file onchange event
    let event = new Event('myEvent');
    spyOnProperty(event, 'target', 'get').and.returnValue(input);

    fixture.whenStable().then(() => {
      // Subscribe to the event
      component.onChange.subscribe(v => {
        expect(v[0]).toBe(attachment);
      });
      // Trigger the event
      component.onInputFileChange(event);
    });
  });
	
  it('should return empty string from classUploadDisabled when canUpload is true and did not reach max attachments', () => {
    expect(component.classUploadDisabled()).toBe('');
	});
	
  it('should return disabled string from classUploadDisabled when max attachments is reached', () => {
    component.attachments.push(new Attachment());
    component.attachments.push(new Attachment());
    component.attachments.push(new Attachment());
    expect(component.classUploadDisabled()).toBe('disabled');
  });

  it('should return disabled string from classUploadDisabled when canUpload input is false', () => {
    component.canUpload = false;
    expect(component.classUploadDisabled()).toBe('disabled');
  });

  it('should return disabled string from classUploadDisabled when either canUpload input is false and reached max attachments', () => {
    component.canUpload = false;
    component.attachments.push(new Attachment());
    component.attachments.push(new Attachment());
    component.attachments.push(new Attachment());    
    expect(component.classUploadDisabled()).toBe('disabled');
  });

  
  it('should return align-center align-left or align-right from classGalery', () => {
    component.align = 'center';
    expect(component.classGalery()).toContain('align-center');
    component.align = 'left';
    expect(component.classGalery()).toContain('align-left');
    component.align = 'right';
    expect(component.classGalery()).toContain('align-right');
  });


  it('should not display thumbnail container when attachment status deleted', () => {
    const attachment = new Attachment();
    attachment.status = AttachmentStatus.DELETED;
    expect(component.displayThumbnailContainer(attachment)).toBe(false);
    attachment.status = undefined;
    expect(component.displayThumbnailContainer(attachment)).toBe(true);
    attachment.status = null;
    expect(component.displayThumbnailContainer(attachment)).toBe(true);
    attachment.status = AttachmentStatus.ERROR;
    expect(component.displayThumbnailContainer(attachment)).toBe(true);
    attachment.status = AttachmentStatus.READING;
    expect(component.displayThumbnailContainer(attachment)).toBe(true);
    attachment.status = AttachmentStatus.STORED;
    expect(component.displayThumbnailContainer(attachment)).toBe(true);
    attachment.status = AttachmentStatus.UPLOADING;
    expect(component.displayThumbnailContainer(attachment)).toBe(true);
  });

  it('should display thumbnail when attachment has thumbnail', () => {
    const attachment = new Attachment();
    expect(component.classThumbnailContent(attachment)).not.toContain('has-thumbnail');
    attachment.links.push(new Link('thumbnail', 'attachment.component.spec.jpg'));
    expect(component.classThumbnailContent(attachment)).toContain('has-thumbnail');
  });

  it('should display thumbnail tile according to attachment status', () => {
    const attachment = new Attachment();
    attachment.status = AttachmentStatus.DELETED;
    expect(component.classThumbnailContent(attachment)).toContain('DELETED');
    attachment.status = AttachmentStatus.ERROR;
    expect(component.classThumbnailContent(attachment)).toContain('ERROR');
    attachment.status = AttachmentStatus.READING;
    expect(component.classThumbnailContent(attachment)).toContain('READING');
    attachment.status = AttachmentStatus.STORED;
    expect(component.classThumbnailContent(attachment)).toContain('STORED');
    attachment.status = AttachmentStatus.UPLOADING;
    expect(component.classThumbnailContent(attachment)).toContain('UPLOADING');
  });

  it('should delete attachment', () => {
    const attachment = new Attachment();
    component.attachments.push(attachment);
    component.onChange.subscribe(v => {
      expect(attachment.status).toBe(AttachmentStatus.DELETED);
    });
    component.delete(attachment);
  });

  it('should open attachment', () => {
    const attachment = new Attachment();
    expect(component.isAttachmentOpen(attachment)).toBe(false);
    component.openAttachment(attachment);
    expect(component.isAttachmentOpen(attachment)).toBe(true);
  });

});
