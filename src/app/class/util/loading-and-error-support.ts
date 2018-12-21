import { MessageType } from '../../common/message-panel/message-panel.component';

export class LoadingAndErrorSupport {
  loading: boolean = true;
  messageText: string;
  messageType: MessageType;
  messageIcon: string;

  hasMessage(): boolean {
    return !!this.messageText;
  }

  showErrorMessage(text: any, icon?: string) {
    if (text instanceof Error) {
      this.messageText = text.message;
    } else {
      this.messageText = String(text);
    }
    this.messageType = MessageType.ERROR;
  }

  showInfoMessage(text: string, icon?: string) {
    this.messageText = text;
    this.messageType = MessageType.INFO;
  }
}
