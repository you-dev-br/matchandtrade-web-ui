import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentUploaderComponent } from './attachment-uploader.component';

describe('AttachmentEditorComponent', () => {
  let component: AttachmentUploaderComponent;
  let fixture: ComponentFixture<AttachmentUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
