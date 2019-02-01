import { Component, ElementRef, ViewChild } from '@angular/core';
import { ValidationError } from 'src/app/class/common/validation-error';

export enum MessageType {
  ERROR="ERROR", INFO="INFO"
}

@Component({
  selector: 'app-message-banner',
  templateUrl: './message-banner.component.html',
  styleUrls: ['./message-banner.component.scss']
})
export class MessageBannerComponent {
  icon: string;
  messages: string [] = [];
  type: MessageType;
  @ViewChild('container')
  container: ElementRef;

  private buildMessages(message: String | string | string[] | ValidationError): string[] {
    let result: string[];
    if (message instanceof ValidationError) {
      result = message.messages;
    } else {
      result = this.buildMessagesFromArrayOrString(message);
    }
    return result;
  }

  private buildMessagesFromArrayOrString(message: String | string | string[]): string[] {
    const result: string[] = []; 
    if (message instanceof Array) {
      for (let msg of message) {
        result.push(msg);
      }
    } else {
      result.push(String(message));
    }
    return result;
  }

  private classContainer(): string {
    if (this.isMessageEmpty()) {
      return 'mt-hide';
    }
    return (this.type == MessageType.ERROR ? 'error-message' : 'info-message') + ' mat-elevation-z1';
  }

  private isMessageEmpty(): boolean {
    return this.messages == undefined || this.messages == null || this.messages.length < 1;
  }

  isSingleMessage(): boolean {
    return !this.isMessageEmpty() && !(this.messages.length > 1);
  }

  showErrorMessage(message: String | string[] | ValidationError): void {
    this.showMessage(message, MessageType.ERROR);
  }
  
  showInfoMessage(message: String | string[] | ValidationError) {
    this.showMessage(message, MessageType.INFO);
  }
  
  private showMessage(message: String | string[] | ValidationError, type: MessageType) {
    this.type = type;
    this.messages = this.buildMessages(message);
    this.container.nativeElement.classList = this.classContainer();
    this.container.nativeElement.scrollIntoView(true);
    window.scrollTo(0, 0);
  }

  obtainSingleMessage(): string {
    let result = '';
    for(let m of this.messages) {
      result = result.concat(m);
    }
    return result;
  }

  obtainIcon(): string {
    if (this.icon) {
      return this.icon;
    }
    return this.type == MessageType.ERROR ? 'error' : 'info';
  }
}
