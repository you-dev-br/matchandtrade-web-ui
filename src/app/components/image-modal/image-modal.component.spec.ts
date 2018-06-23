import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageModalComponent } from './image-modal.component';

describe('ImageModalComponent', () => {
  let component: ImageModalComponent;
  let fixture: ComponentFixture<ImageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get class modal', () => {
    component.isActive = true;
    expect(component.classModal()).toBe('modal is-active');
    component.isActive = false;
    expect(component.classModal()).toBe('modal');
  });

  it('should emit event when modal is closed', () => {
    const imageSource = 'http://test.com/test.jpg';
    component.imageSource = imageSource;
    const closeEvent = component.onClose;
    closeEvent.subscribe(next => {
      expect(next).toBe(imageSource);
    })
    component.closeModal();
  });

});
