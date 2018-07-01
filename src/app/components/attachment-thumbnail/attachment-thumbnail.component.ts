import { Component, Input } from '@angular/core';
import { Attachment, AttachmentStatus } from '../../classes/pojo/attachment';
import { StringUtil } from '../../classes/util/string-util';
import { AttachmentService } from '../../services/attachment.service';

@Component({
  selector: 'app-attachment-thumbnail',
  templateUrl: './attachment-thumbnail.component.html',
  styleUrls: ['./attachment-thumbnail.component.scss']
})
export class AttachmentThumbnailComponent {

  @Input() attachment?: Attachment;
  @Input() attachmentHref?: string;
  attachmentOpen: boolean = false;
  loading: boolean = true;
  hasError: boolean = false;
  @Input() size?: number = 96;

  constructor() { }

  classAttachmentThumbnail(): string {
    return 'attachment-thumbnail ' + (this.attachment ? this.attachment.status : 'NOT-AVAILABLE');
  }

  closeAttachment(originalUrl: string): void {
    this.attachmentOpen = false;
  }

  displayName(): boolean {
    return !this.getThumbnailUrl() && this.isAttachmentStatusStored();
  }

  getOriginalUrl(): string {
    return (this.attachment && this.attachment.getOriginalUrl() ? this.attachment.getOriginalUrl() : undefined);
  }

  getThumbnailUrl(): string {
    return (this.attachment && this.attachment.getThumbnailUrl() ? this.attachment.getThumbnailUrl() : undefined);
  }

  isAttachmentOpen(): boolean {
    return this.attachmentOpen;
  }

  isAttachmentStatusStored(): boolean {
    return (this.attachment && this.attachment.status == AttachmentStatus.STORED);
  }

  isAttachmentStatusError(): boolean {
    return (this.attachment && this.attachment.status == AttachmentStatus.ERROR);
  }

  isAttachmentStatusReading(): boolean {
    return (this.attachment && this.attachment.status == AttachmentStatus.READING);
  }
  
  isAttachmentStatusLoading(): boolean {
    return (this.attachment && this.attachment.status == AttachmentStatus.LOADING);
  }

  isAttachmentStatusUploading(): boolean {
    return (this.attachment && this.attachment.status == AttachmentStatus.UPLOADING);
  }

  isAttachmentDefined(): boolean {
    return (this.attachment != undefined && this.attachment != null);
  }

  obtainName(): string {
    const shorttenName = StringUtil.shorttenWithEllipsis(this.attachment.name, 45);
    if (shorttenName) {
      return shorttenName;
    }
    return 'Open attachment';
  }

  openAttachment(): void {
    this.attachmentOpen = true;
  }

  onError(event: Event) {
    this.hasError = true;
  }

}
