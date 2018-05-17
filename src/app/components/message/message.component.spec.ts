import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { Message } from './message';

describe('message.component', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display info message', () => {
    const testingMessage = new Message();
    testingMessage.setInfoItems("Info message.");
    component.message = testingMessage;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.is-success')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#message-body div').innerHTML).toContain('Info message.');
    });
  });

  it('should display error message', () => {
    const testingMessage = new Message();
    testingMessage.setErrorItems("Error message.");
    component.message = testingMessage;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.is-danger')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#message-body div').innerHTML).toContain('Error message.');
    });
  });

  it('should display error message based on an error object', () => {
    const testingMessage = new Message();
    testingMessage.setErrorItems(new Error('Error object.'));
    component.message = testingMessage;
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.is-danger')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#message-body div').innerHTML).toContain('Error object.');
    });
  });

});
