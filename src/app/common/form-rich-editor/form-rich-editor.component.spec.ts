import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRichEditorComponent } from './form-rich-editor.component';

describe('FormRichEditorComponent', () => {
  let component: FormRichEditorComponent;
  let fixture: ComponentFixture<FormRichEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRichEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRichEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
