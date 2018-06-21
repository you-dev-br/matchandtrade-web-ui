import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentThumbnailComponent } from './attachment-thumbnail.component';

describe('AttachmentThumbnailComponent', () => {
  let component: AttachmentThumbnailComponent;
  let fixture: ComponentFixture<AttachmentThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentThumbnailComponent ]
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
