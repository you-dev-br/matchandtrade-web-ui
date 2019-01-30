import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

export enum MessageType {
  ERROR="ERROR", INFO="INFO"
}

@Component({
  selector: 'app-message-banner',
  templateUrl: './message-banner.component.html',
  styleUrls: ['./message-banner.component.scss']
})
export class MessageBannerComponent {
  @Input()
  icon: string;
  @Input()
  messages: string [] = [];
  @Input()
  type: MessageType;

  classMessagePanel(): string {
    if (this.isMessageEmpty()) {
      return 'mt-hide';
    }
    const messageType = (this.type == MessageType.ERROR ? 'error-message' : 'info-message');
    return messageType + ' mat-elevation-z1';
  }

  private isMessageEmpty(): boolean {
    return this.messages == undefined || this.messages == null || this.messages.length < 1;
  }

  isSingleMessage(): boolean {
    return !this.isMessageEmpty() && !(this.messages.length > 1);
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

  title(): string {
    return this.type == MessageType.ERROR ? 'Error' : 'Info';
  }
}
