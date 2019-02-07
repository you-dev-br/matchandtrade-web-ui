import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AttachmentService } from 'src/app/service/attachment.service';
import { Attachment } from 'src/app/class/attachment';

import * as Croppie from 'croppie';


enum Status { PRESTINE, LOADING, LOADED, CROPPING, UPLOADING, DONE };

@Component({
  selector: 'app-attachment-preview-dialog',
  templateUrl: './attachment-preview-dialog.component.html',
  styleUrls: ['./attachment-preview-dialog.component.scss']
})
export class AttachmentPreviewDialogComponent implements AfterViewInit, OnDestroy {
  attachment: Attachment;
  croppie: Croppie;
  croppieOptions: Croppie.CroppieOptions;
  @ViewChild('imagePreviewContainer')
  imagePreviewContainer: ElementRef;
  status = Status.PRESTINE;
  uploadProgress: number;

  constructor(
      private attachmentService: AttachmentService,
      public dialogRef: MatDialogRef<AttachmentPreviewDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public currentFile: File) {
    
    this.croppieOptions = {
      viewport: { width: 280, height: 200 },
      boundary: { width: 300, height: 220 },
      showZoomer: false,
      enableOrientation: true
    };
  }

  ngAfterViewInit(): void {
    this.croppie = new Croppie(this.imagePreviewContainer.nativeElement, this.croppieOptions);
    this.loadPreviewImage();
  }

  ngOnDestroy(): void {
    this.croppie.destroy();
  }


  private loadPreviewImage(): void {
    this.status = Status.LOADING;
    let reader = new FileReader();
    reader.onload = (progressEvent: Event) =>{
      const dataUrl: string = String(reader.result);
      this.croppie.bind({url: dataUrl})
        .then(() => {
          this.status = Status.LOADED;
        })
        .catch(e => {
          console.log('TODO: Catch-me!', e)
        });
    };
    reader.readAsDataURL(this.currentFile);
  }



  onPreviewCrop(): void {
    if (this.status != Status.LOADED) {
      console.log('TODO Show message: No image to upload');
      return;
    }
    this.status = Status.CROPPING;
    this.croppie.result({
      type: 'blob',
      size: {width: 1600, height: 1200},
      format: 'jpeg',
      quality: .5,
      circle: false
    })
    .then(croppedBlob => {
      this.status = Status.UPLOADING;
      const file = new File([croppedBlob], this.currentFile.name, {type: croppedBlob.type, lastModified: this.currentFile.lastModified});
      this.attachmentService.upload(file)
        .subscribe(next => {
          this.attachment = next.key;
          this.uploadProgress = next.value;
        }, 
        error => console.log('TODO send error message'),
        () => this.dialogRef.close(this.attachment));
      })
    .catch(e => console.log('TODO Send a message:', e))
    .finally(() => this.status = Status.DONE);
  }
  
  onPreviewRotateClockWise(): void {
    if (this.status == Status.LOADED) {
      this.croppie.rotate(-90);
    }
  }

  onPreviewRotateCounterClockWise(): void {
    if (this.status == Status.LOADED) {
      this.croppie.rotate(90);
    }
  }
}
