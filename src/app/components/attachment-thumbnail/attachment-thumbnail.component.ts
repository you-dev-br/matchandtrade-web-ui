import { Component, OnInit, Input } from '@angular/core';
import { FileService } from '../../services/file.service';
import { Attachment, AttachmentStatus } from '../../classes/pojo/attachment';
import { StringUtil } from '../../classes/util/string-util';

@Component({
  selector: 'app-attachment-thumbnail',
  templateUrl: './attachment-thumbnail.component.html',
  styleUrls: ['./attachment-thumbnail.component.scss'],
  providers: [ FileService ]
})
export class AttachmentThumbnailComponent {

  @Input() attachment: Attachment;
  attachmentOpen: boolean = false;
  hasError: boolean = false;
  @Input() size?: number = 96;

  constructor(private fileService: FileService) { }

  classAttachmentThumbnail(): string {
    return 'attachment-thumbnail ' + this.attachment.status;
  }

  closeAttachment(originalUrl: string): void {
    this.attachmentOpen = false;
  }

  displayName(): boolean {
    return !this.getThumbnailUrl() && this.isAttachmentStatusStored();
  }

  getOriginalUrl(): string {
    return (this.attachment && this.attachment.originalUrl ? this.attachment.originalUrl : undefined);
  }

  getThumbnailUrl(): string {
    return (this.attachment && this.attachment.thumbnailUrl ? this.attachment.thumbnailUrl : undefined);
  }

  isAttachmentOpen(): boolean {
    return this.attachmentOpen;
  }

  isAttachmentStatusStored(): boolean {
    return this.attachment.status == AttachmentStatus.STORED;
  }

  isAttachmentStatusError(): boolean {
    return this.attachment.status == AttachmentStatus.ERROR;
  }

  isAttachmentStatusReading(): boolean {
    return this.attachment.status == AttachmentStatus.READING;
  }

  isAttachmentStatusUploading(): boolean {
    return this.attachment.status == AttachmentStatus.UPLOADING;
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
