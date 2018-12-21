import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

export enum MessageType {
  ERROR="ERROR", INFO="INFO"
}
export class Message {
  text: string;
  type: MessageType;

  info(text: string): void {
    this.text = text;
		this.type = MessageType.INFO;
	}
  error(text: string): void {
    this.text = text;
		this.type = MessageType.ERROR;
  }
  isError(): boolean {
    return this.type == MessageType.ERROR;
  }
  isInfo(): boolean {
    return this.type == MessageType.INFO;
  }
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
  message: string;
  @Input()
  type: MessageType;

  constructor() { }

  classType() {
    const messageTypeClass: string = (this.type ==MessageType.ERROR ? 'error-message' : 'info-message');
    return messageTypeClass + ' mat-elevation-z1';
  }

  title(): string {
    return this.type == MessageType.ERROR ? 'Error' : 'Info';
  }

  obtainIcon(): string {
    if (this.icon) {
      return this.icon;
    }
    return this.type == MessageType.ERROR ? 'error' : 'info';
  }
}
