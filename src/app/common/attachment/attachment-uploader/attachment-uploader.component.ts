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
  @ViewChild('imagePreviewContainer')
  imagePreviewContainer: ElementRef;
  inputFileId = 'input-file-id-' + Math.floor(1000000 - Math.random());
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

  onLoadPreviewImage(event: Event): void {
    this.status = Status.LOADING;
    const inputFileElement: HTMLInputElement = <HTMLInputElement> event.target;
    this.currentFile = inputFileElement.files[0];
    if (!inputFileElement.files && this.currentFile) {
      this.status = Status.PRESTINE;
      return;
    }

    let reader = new FileReader();
    reader.onload = (progressEvent: Event) =>{
      const dataUrl: string = String(reader.result);
      this.croppie.bind({url: dataUrl})
        .then(() => {
          this.status = Status.LOADED;
        })
        .catch(e => {
          console.log('catch ', e)
        });
    };
    reader.readAsDataURL(this.currentFile);
  }

  onCrop(): void {
    if (this.status != Status.LOADED) {
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
        const files: File[] = [];
        const file = new File([croppedBlob], this.currentFile.name, {type: croppedBlob.type, lastModified: this.currentFile.lastModified});
        files.push(file);
        this.attachmentService.upload(files)
          .then(progressMap => {
            progressMap.get(0).subscribe(progress => this.uploadProgress = progress);
          })
          .finally(() => this.status = Status.DONE);
      });
  }
  
  onRotateClockWise(): void {
    if (this.status == Status.LOADED) {
      this.croppie.rotate(-90);
    }
  }

  onRotateCounterClockWise(): void {
    if (this.status == Status.LOADED) {
      this.croppie.rotate(90);
    }
  }
}
