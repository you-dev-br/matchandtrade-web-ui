import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentPreviewDialogComponent } from './attachment-preview-dialog.component';

describe('AttachmentPreviewDialogComponent', () => {
  let component: AttachmentPreviewDialogComponent;
  let fixture: ComponentFixture<AttachmentPreviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentPreviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentPreviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
