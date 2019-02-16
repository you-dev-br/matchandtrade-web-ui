import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Attachment } from 'src/app/class/attachment';
import { AttachmentService } from 'src/app/service/attachment.service';

@Component({
  selector: 'app-attachment-gallery',
  templateUrl: './attachment-gallery.component.html',
  styleUrls: ['./attachment-gallery.component.scss']
})
export class AttachmentGalleryComponent {
  @Input()
  attachments: Attachment[] = [];
  @Output()
  onDeleteError = new EventEmitter<Error>();
  private loadedAttachments: string[] = [];

  constructor(private attachmentService: AttachmentService) { }

  async onDelete(attachment: Attachment): Promise<void> {
    console.log('delete', this.loadedAttachments);
    try {
      this.loadedAttachments.splice(this.loadedAttachments.indexOf(attachment.attachmentId), 1);
      await this.attachmentService.delete(attachment.getSelfHref());
      this.attachments.splice(this.attachments.indexOf(attachment), 1);
    } catch (e) {
      this.onDeleteError.emit(e);
    }
  }

  isAttachmentLoaded(attachment): boolean {
    console.log('isLoaded', this.loadedAttachments);
    return this.loadedAttachments.includes(attachment.attachmentId);
  }

  onLoadAttachment(attachment: Attachment): void {
    this.loadedAttachments.push(attachment.attachmentId);
  }

  onUploadComplete(attachment: Attachment): void {
    if (attachment) {
      this.attachments.push(attachment);
    }
  }
}
