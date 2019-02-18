import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Attachment } from 'src/app/class/attachment';
import { AttachmentService } from 'src/app/service/attachment.service';
import { AngularMaterialImageOverlayService } from 'angular-material-image-overlay';

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

  constructor(
    private attachmentService: AttachmentService,
    private imageOverlayService: AngularMaterialImageOverlayService) { }

  async onDelete(attachment: Attachment): Promise<void> {
    try {
      this.loadedAttachments.splice(this.loadedAttachments.indexOf(attachment.attachmentId), 1);
      await this.attachmentService.delete(attachment.getSelfHref());
      this.attachments.splice(this.attachments.indexOf(attachment), 1);
    } catch (e) {
      this.onDeleteError.emit(e);
    }
  }

  isAttachmentLoaded(attachment): boolean {
    return this.loadedAttachments.includes(attachment.attachmentId);
  }

  onLoadAttachment(attachment: Attachment): void {
    this.loadedAttachments.push(attachment.attachmentId);
  }

  onOpenImageOverlay(attachment: Attachment): void {
    const images: string[] = this.attachments.map(attachment => attachment.getOriginalHref());
    this.imageOverlayService.open(images, attachment.getOriginalHref());
  }

  onUploadComplete(attachment: Attachment): void {
    if (attachment) {
      this.attachments.push(attachment);
    }
  }
}
