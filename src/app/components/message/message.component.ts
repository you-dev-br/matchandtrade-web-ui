import { Component, Input } from '@angular/core';

import { Message, MessageType } from './message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() message: Message;

  hasMessages(): boolean {
    if (this.message && this.message.items && this.message.items.length > 0) {
      return true;
    }
    return false;
  }

  messageClass(): string {
    const result = "message";
    if (this.message.type == MessageType.ERROR) {
      return result + " is-danger";
    }
    return result + " is-success";
  }

  messageIconClass(): string {
    const result = "fa";
    if (this.message.type == MessageType.ERROR) {
      return result + " fa-times";
    }
    return result + " fa-check";
  }

  messageBodyClass(): string {
    const result = "message-body is-size-7";
    if (this.message.type == MessageType.ERROR) {
      return result + " has-text-danger";
    }
    return result + " has-text-success";
  }

}
