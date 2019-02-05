import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

import * as Croppie from 'croppie';
import { AttachmentService } from 'src/app/service/attachment.service';

enum Status { PRESTINE, LOADING, LOADED, CROPPING, UPLOADING, DONE };

@Component({
  selector: 'app-attachment-uploader',
  templateUrl: './attachment-uploader.component.html',
  styleUrls: ['./attachment-uploader.component.scss']
})
export class AttachmentUploaderComponent implements AfterViewInit, OnDestroy {
  croppie: Croppie;
  croppieOptions: Croppie.CroppieOptions;
  currentFile: File;
  dragginOverUploadAttachment: boolean = false;
  @ViewChild('imagePreviewContainer')
  imagePreviewContainer: ElementRef;
  @ViewChild('inputFileElement')
  inputFileElement: ElementRef;
  status = Status.PRESTINE;
  uploadProgress: number;

  constructor(private attachmentService: AttachmentService) {
    this.croppieOptions = {
      viewport: { width: 280, height: 200 },
      boundary: { width: 300, height: 220 },
      showZoomer: false,
      enableOrientation: true
    };
  }

  ngAfterViewInit(): void {
    this.croppie = new Croppie(this.imagePreviewContainer.nativeElement, this.croppieOptions);
  }

  ngOnDestroy(): void {
    this.croppie.destroy();
  }

  classUploadAttachment() {
    return 'attachment-uploader' + (this.dragginOverUploadAttachment ? ' attachment-uploader-dragging' : '');
  }

  private loadPreviewImage(file: File): void {
    this.status = Status.LOADING;
    this.currentFile = file;
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

  onLoadImage(event: Event): void {
    // TODO: Show message when files isn't an image
    const inputFileElement: HTMLInputElement = <HTMLInputElement> event.target;
    if (inputFileElement.files.length > 0) {
      this.loadPreviewImage(inputFileElement.files[0]);
    }
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
      this.loadPreviewImage(event.dataTransfer.files[0]);
    }
    this.dragginOverUploadAttachment = false;
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
          .then(progress => {
            progress.subscribe(progress => this.uploadProgress = progress);
          })
          .finally(() => this.status = Status.DONE);
      });
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
