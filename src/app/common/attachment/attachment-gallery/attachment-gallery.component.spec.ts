import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentGalleryComponent } from './attachment-gallery.component';

describe('AttachmentGalleryComponent', () => {
  let component: AttachmentGalleryComponent;
  let fixture: ComponentFixture<AttachmentGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
