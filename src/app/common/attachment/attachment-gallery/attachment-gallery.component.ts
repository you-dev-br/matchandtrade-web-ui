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

  constructor(private attachmentService: AttachmentService) { }

  async onDelete(attachment: Attachment): Promise<void> {
    try {
      await this.attachmentService.delete(attachment.getSelfHref());
      this.attachments.splice(this.attachments.indexOf(attachment), 1);
    } catch (e) {
      this.onDeleteError.emit(e);
    }
  }

  onUploadComplete(attachment: Attachment): void {
    if (attachment) {
      this.attachments.push(attachment);
    }
  }
}
