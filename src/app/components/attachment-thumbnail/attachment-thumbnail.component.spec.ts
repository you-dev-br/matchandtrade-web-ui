import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentThumbnailComponent } from './attachment-thumbnail.component';
import { Attachment, AttachmentStatus } from '../../classes/pojo/attachment';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { FileService } from '../../services/file.service';

class FileServiceMock {}

describe('AttachmentThumbnailComponent', () => {
  let component: AttachmentThumbnailComponent;
  let fixture: ComponentFixture<AttachmentThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentThumbnailComponent, ImageModalComponent ]
    })
    .overrideComponent(AttachmentThumbnailComponent, {
      set: { 
        providers: [
          { provide: FileService, useClass: FileServiceMock} 
        ]}
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentThumbnailComponent);
    component = fixture.componentInstance;
    component.attachment = new Attachment();
    fixture.detectChanges();
  });

  it('should obtain attachment-thumbnail style class', () => {
    // Warning: if we ever change AttachmentStatus we need to make sure to update attachment-thumbnail.component.css as it depends on it
    component.attachment.status = AttachmentStatus.DELETED;
    let deletedClass = component.classAttachmentThumbnail();
    expect(deletedClass).toBe('attachment-thumbnail DELETED');
    component.attachment.status = AttachmentStatus.STORED;
    let storedClass = component.classAttachmentThumbnail();
    expect(storedClass).toBe('attachment-thumbnail STORED');
    component.attachment.status = AttachmentStatus.ERROR;
    let errorClass = component.classAttachmentThumbnail();
    expect(errorClass).toBe('attachment-thumbnail ERROR');
    component.attachment.status = AttachmentStatus.READING;
    let readingClass = component.classAttachmentThumbnail();
    expect(readingClass).toBe('attachment-thumbnail READING');
    component.attachment.status = AttachmentStatus.UPLOADING;
    let uploadingClass = component.classAttachmentThumbnail();
    expect(uploadingClass).toBe('attachment-thumbnail UPLOADING');
  });

  it('should display name', () => {
    component.attachment.thumbnailUrl = 'test';
    component.attachment.status = AttachmentStatus.STORED;
    expect(component.displayName()).toBe(false);
    component.attachment.thumbnailUrl = undefined;
    component.attachment.status = AttachmentStatus.STORED;
    expect(component.displayName()).toBe(true);
  });

  it('should ellipsis long names', () => {
    const longName = '01234567890123456789012345678901234567890123456789';
    component.attachment.name = longName;
    expect(component.obtainName()).toBe('012345678901234567890123456789012345678901234...');
    const shortName = '01234567890123456789012345678901234567890123';
    component.attachment.name = shortName;
    expect(component.obtainName()).toBe(shortName);
    const noName = null;
    component.attachment.name = noName;
    expect(component.obtainName()).toBe('Open attachment');
  });

});
