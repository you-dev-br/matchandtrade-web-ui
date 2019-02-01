import { ViewChild } from '@angular/core';

import { MessageBannerComponent } from '../../common/message-banner/message-banner.component';
import { ValidationError } from './validation-error';

export class LoadingAndMessageBannerSupport {
  loading: boolean = true;
  @ViewChild(MessageBannerComponent)
  messageComponent: MessageBannerComponent;

  showErrorMessage(message: String | string[] | ValidationError) {
    this.messageComponent.showErrorMessage(message);
  }

  showInfoMessage(message: string | string[], icon?: string) {
    this.messageComponent.showInfoMessage(message);
  }
}
