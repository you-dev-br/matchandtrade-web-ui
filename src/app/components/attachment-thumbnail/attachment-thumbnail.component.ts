import { Component, OnInit, Input } from '@angular/core';
import { FileService } from '../../services/file.service';
import { Attachment } from '../../classes/pojo/attachment';

@Component({
  selector: 'app-attachment-thumbnail',
  templateUrl: './attachment-thumbnail.component.html',
  styleUrls: ['./attachment-thumbnail.component.scss'],
  providers: [ FileService ]
})
export class AttachmentThumbnailComponent implements OnInit {

  attachmentOpen: boolean = false;
  loading: boolean = true;
  hasError: boolean = false;
  @Input() attachment: Attachment;
  @Input() size?: number = 96;

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.loading = false;
  }

  classAttachmentThumbnail(): string {
    return 'attachment-thumbnail ' + this.attachment.status;
  }

  closeAttachment(originalUrl: string): void {
    this.attachmentOpen = false;
  }

  obtainName(): string {
    if (this.attachment && this.attachment.name) {
      const maxLength = 45;
      const ellipisis = (this.attachment.name.length >= maxLength ? '...' : '');
      return this.attachment.name.substring(0, maxLength) + ellipisis;
    }
    return 'Open attachment';
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

  openAttachment(): void {
    this.attachmentOpen = true;
  }

  onError(event: Event) {
    this.hasError = true;
  }

}
