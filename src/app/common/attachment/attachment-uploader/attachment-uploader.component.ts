import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AttachmentPreviewDialogComponent } from '../attachment-preview-dialog/attachment-preview-dialog.component';
import { Attachment } from 'src/app/class/attachment';

@Component({
  selector: 'app-attachment-uploader',
  templateUrl: './attachment-uploader.component.html',
  styleUrls: ['./attachment-uploader.component.scss']
})
export class AttachmentUploaderComponent {
  dragginOverUploadAttachment: boolean = false;
  @ViewChild('inputFileElement')
  inputFileElement: ElementRef;
  @Output()
  onUploadComplete = new EventEmitter<Attachment>();

  constructor(public dialog: MatDialog) { }

  classUploadAttachment() {
    return 'attachment-uploader' + (this.dragginOverUploadAttachment ? ' attachment-uploader-dragging' : '');
  }

  onLoadImage(event: Event): void {
    // TODO: Show message when files isn't an image
    const inputFileElement: HTMLInputElement = <HTMLInputElement> event.target;
    if (inputFileElement.files.length > 0) {
      this.openPreviewDialog(inputFileElement.files[0]);
    }
  }

  private openPreviewDialog(file: File): any {
    const dialogRef = this.dialog.open(AttachmentPreviewDialogComponent, {
      maxWidth: '600px',
      data: file
    });
    dialogRef.afterClosed().subscribe(next => {
      this.onUploadComplete.emit(next);
    });
  }

  onUploadAttachmentClick(event: Event) {
    event.preventDefault();
    this.inputFileElement.nativeElement.click();
  }

  onUploadAttachmentDraging(event: DragEvent): void {
    event.preventDefault();
    this.dragginOverUploadAttachment = true;
  }
  
  onUploadAttachmentDragexit(event: DragEvent): void {
    event.preventDefault();
    this.dragginOverUploadAttachment = false;
  }
  
  onUploadAttachmentDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      this.openPreviewDialog(event.dataTransfer.files[0]);
    }
    this.dragginOverUploadAttachment = false;
  }
}
