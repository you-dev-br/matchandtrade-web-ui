import { MessageType } from '../../common/message-banner/message-banner.component';

export class LoadingAndMessageBannerSupport {
  loading: boolean = true;
  messageText: string;
  messageType: MessageType;
  messageIcon: string;

  hasMessage(): boolean {
    return !!this.messageText;
  }

  showErrorMessage(text: any, icon?: string) {
    const code: string = text.code && text.code != 400 ? `${text.code} : ` : '';
    if (text instanceof Error) {
      this.messageText = `${code} ${text.message}`;
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
