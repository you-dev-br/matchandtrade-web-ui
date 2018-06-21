import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentThumbnailComponent } from './attachment-thumbnail.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { FileService } from '../../services/file.service';

class FileServiceMock {}

xdescribe('AttachmentThumbnailComponent', () => {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
