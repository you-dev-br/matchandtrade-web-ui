import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileService } from '../../services/file.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { error } from 'selenium-webdriver';
import { Message } from '../message/message';
import { Attachment, AttachmentStatus } from '../../classes/pojo/attachment';
import { FileTransformer } from '../../classes/transformers/file-transformer';
import { AttachmentTransformer } from '../../classes/transformers/attachment-transformer';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
	styleUrls: ['./attachments.component.scss'],
	providers: [ FileService ]
})
export class AttachmentsComponent {
  @Input() align?: string;
	@Input() attachments: Attachment[];
	@Input() canUpload: boolean;
	@Input() canDelete: boolean;
	@Output() onChange = new EventEmitter<Attachment[]>();
  @Input() maxAttachments ?:number = 3;
  
	attachmentTransformer = new AttachmentTransformer();
	error: string;
	fileTransformer = new FileTransformer();
	openedAttachments = new Set<string>();

  constructor(private fileStorageService: FileService) { }
  
	private blobToFile(blob: Blob, fileName: string, fileType: string, lastModifiedDate: number): File {
    return new File([blob], fileName, {type: fileType, lastModified: lastModifiedDate});
	}

	private buildResizedImage(file: File): Promise<File> {
		return new Promise<File>((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				const img = new Image();
				img.src = reader.result;
				img.onload = (e) => {
					resolve(this.resizeImage(img, file.name, file.type, file.lastModifiedDate.getTime()));
				}
			}
			reader.readAsDataURL(file);
		});
  }

  closeAttachment(originalUrl) {
	  this.openedAttachments.delete(originalUrl);
  }
 
	delete(attachment: Attachment): void {
		attachment.status = AttachmentStatus.DELETED;
		this.onChange.emit(this.attachments);
	}

	displayThumbnailLink(attachment: Attachment): boolean {
		return (attachment.status == AttachmentStatus.STORED);
	}

	displayThumbnailContainer(attachment: Attachment): boolean {
		return attachment.status != AttachmentStatus.DELETED;
	}

	displayThumbnailImage(attachment: Attachment): boolean {
		return (attachment.thumbnailUrl ? true : false);
	}

  classGalery(): string {
    const basicClass = 'gallery is-fullwidth'
    if (!this.align) {
      return basicClass + ' align-center';
    }
    return basicClass + ' align-' + this.align;
  }
  
	classThumbnailContent(attachment: Attachment): string {
		let result: string = 'thumbnail-content';
		result += ' ' + attachment.status;
		result += (attachment.thumbnailUrl ? ' has-thumbnail' : '');
		return result;
	}

	private handleUploadCompleted(fileUpload: Attachment): void {
		fileUpload.status = AttachmentStatus.STORED;
		this.error = undefined;
		this.onChange.emit(this.attachments);
	}

	private handleUploadError(fileUpload: Attachment): void {
		fileUpload.status = AttachmentStatus.ERROR;
		fileUpload.error = "Error uploading file";
		this.onChange.emit(this.attachments);
	}

	private handleUploadSubscription(v: HttpEvent<{}>, attachment: Attachment): void {
		if (v.type == HttpEventType.UploadProgress) {
			attachment.status = AttachmentStatus.UPLOADING;
			attachment.percentageUploaded = Math.round(100 * v.loaded / v.total);
		} else if (v.type == HttpEventType.Response) {
			let responseBody = JSON.parse(v.body.toString());
			let responseFile = this.fileTransformer.toPojo(responseBody);
			let responseAttachment = this.attachmentTransformer.toPojo(responseFile);
			Object.assign(attachment, responseAttachment);
		}
	}

	isAttachmentOpen(attachment: Attachment): boolean {
		return this.openedAttachments.has(attachment.originalUrl);
	}

	isUploadEnabled(): boolean {
    let nonDeletedAttachments = this.obtainNumberOfNonDeletedAttachments();
		return (nonDeletedAttachments < this.maxAttachments);
  }
  
  obtainNumberOfNonDeletedAttachments(): number {
    let result = 0;
    for (let i=0; i<this.attachments.length; i++) {
      if (this.attachments[i] && this.attachments[i].status != AttachmentStatus.DELETED) {
        result++;
      }
    }
    return result;
  }
	
	onInputFileChange(event: Event): void {
		const inputElement = <HTMLInputElement> event.target;
		const inputFiles = inputElement.files;
		if ((inputFiles.length + this.obtainNumberOfNonDeletedAttachments()) > this.maxAttachments) {
			this.error = 'Items cannot have more than 3 images.';
			return;
		}
		this.onChange.emit(this.attachments);
		for(let i=0; i<inputFiles.length; i++) {
			const attachment = new Attachment();
			attachment.status = AttachmentStatus.READING;
			this.attachments.push(attachment);
			this.buildResizedImage(inputFiles.item(i)).then(resizedFile => {
				this.upload(resizedFile, attachment);
			});
		}
	}

	openAttachment(attachment: Attachment) {
		this.openedAttachments.add(attachment.originalUrl);
	}

	private resizeImage(image: HTMLImageElement, filename: string, filetype: string, lastModifiedDate: number): Promise<File> {
		return new Promise<File>((resolve, reject) => {
			let resultingCanvas: HTMLCanvasElement = null;
			
			// Maximum image size is proportional to 1280x800
			const maxDimention = 1280*800;
			
			// Resize image to fit max dimention
			if (image.height * image.width > maxDimention) {
				const exponentialRatio = (image.height * image.width) / maxDimention;
				const linearRation = Math.pow(exponentialRatio, 0.5);
				image.height /= linearRation;
				image.width /= linearRation;
			}

			// Draw image into canvas
			const canvas: HTMLCanvasElement = document.createElement('canvas');
			let context = canvas.getContext('2d');
			canvas.width = image.width;
			canvas.height = image.height;
			context.drawImage(image, 0, 0, image.width, image.height);
			canvas.toBlob( blob => {
				const blobAsFile = this.blobToFile(blob, filename, filetype, lastModifiedDate);
				resolve(blobAsFile);
			}, 'image/jpeg', 0.75);
		});
	}

	private upload(file: File, attachment: Attachment): void {
		this.fileStorageService.save(file).subscribe(
			val => this.handleUploadSubscription(val, attachment),
			err => this.handleUploadError(attachment),
			( ) => this.handleUploadCompleted(attachment)
		);
	}

	uploadDisabledClass(): string {
		return this.isUploadEnabled() ? '' : 'disabled';
	}

	thumbnailImageError(event: Event, attachment: Attachment): void {
		// TODO: Migrate to a logging lib
		console.log("AttachmentsComponent", "Error loading thumbnail image", attachment);
		attachment.thumbnailUrl = undefined;
	}

}
