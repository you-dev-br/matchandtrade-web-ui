import { MessageType } from '../../common/message-banner/message-banner.component';
import { ValidationError } from './validation-error';

export class LoadingAndMessageBannerSupport {
  loading: boolean = true;
  messages: string[];
  messageType: MessageType;
  messageIcon: string;

  private obtainMessagesFromArrayOrString(desiredMessages: any): string[] {
    const result: string[] = []; 
    if (desiredMessages instanceof Array) {
      for (let message of desiredMessages) {
        result.push(String(message));
      }
    } else {
      result.push(String(desiredMessages));
    }
    return result;
  }

  showErrorMessage(text: String | string[] | ValidationError, icon?: string) {
    this.messageType = MessageType.ERROR;
    if (text instanceof ValidationError) {
      this.messages = text.messages;
    } else {
      this.messages = this.obtainMessagesFromArrayOrString(text);
    }
  }

  showInfoMessage(desiredMessages: string | string[], icon?: string) {
    this.messageType = MessageType.INFO;
    this.messages = this.obtainMessagesFromArrayOrString(desiredMessages);
  }
}
