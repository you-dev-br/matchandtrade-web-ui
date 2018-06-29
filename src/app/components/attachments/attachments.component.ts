import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AttachmentService } from '../../services/attachment.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { Attachment, AttachmentStatus } from '../../classes/pojo/attachment';
import { AttachmentTransformer } from '../../classes/transformers/attachment-transformer';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
	styleUrls: ['./attachments.component.scss'],
	providers: [ AttachmentService ]
})
export class AttachmentsComponent {
  @Input() align?: string;
	@Input() attachments: Attachment[];
	attachmentTransformer = new AttachmentTransformer();
	@Input() canUpload: boolean;
	@Input() canDelete: boolean;
	error: string;
	@Output() onChange = new EventEmitter<Attachment[]>();
	openedAttachments = new Set<Attachment>();
  @Input() maxAttachments?: number = 3;

  constructor(private attachmentService: AttachmentService) { }
  
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
			reader.onerror = (e) => {
				reject(e);
			};
			reader.readAsDataURL(file);
		});
  }

  classAddImagesLabel(): string {
    return 'file-label ' + this.classUploadDisabled();
  }

  classAddImagesButton(): string {
    return 'file-cta ' + this.classUploadDisabled();
  }

  classUploadDisabled(): string {
		return this.isUploadEnabled() ? '' : 'disabled';
	}

  closeAttachment(originalUrl) {
	  this.openedAttachments.delete(originalUrl);
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
		result += (attachment.getThumbnailUrl() ? ' has-thumbnail' : '');
		return result;
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
		return (attachment.getThumbnailUrl() ? true : false);
	}

	private handleUploadCompleted(attachment: Attachment): void {
		attachment.status = AttachmentStatus.STORED;
		this.error = undefined;
		this.onChange.emit(this.attachments);
	}

	private handleUploadError(attachment: Attachment): void {
		attachment.status = AttachmentStatus.ERROR;
		attachment.error = "Error uploading file";
		this.onChange.emit(this.attachments);
	}

	private handleUploadSubscription(v: HttpEvent<{}>, attachment: Attachment): void {
		if (v.type == HttpEventType.UploadProgress) {
			attachment.status = AttachmentStatus.UPLOADING;
			attachment.percentageUploaded = Math.round(100 * v.loaded / v.total);
		} else if (v.type == HttpEventType.Response) {
			let responseBody = JSON.parse(v.body.toString());
			let responseAttachment = this.attachmentTransformer.toPojo(responseBody);
			Object.assign(attachment, responseAttachment);
		}
	}

	isAttachmentOpen(attachment: Attachment): boolean {
		return this.openedAttachments.has(attachment);
	}

	isUploadEnabled(): boolean {
    let nonDeletedAttachments = this.obtainNumberOfNonDeletedAttachments();
		return (nonDeletedAttachments < this.maxAttachments) && this.canUpload;
  }
  
  private obtainNumberOfNonDeletedAttachments(): number {
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
		this.openedAttachments.add(attachment);
	}

  // TODO: We need to handle iOS issues, we might have to change this to a more powerful library
	private resizeImage(image: HTMLImageElement, filename: string, filetype: string, lastModifiedDate: number): Promise<File> {
		return new Promise<File>((resolve, reject) => {
      // TODO: add a reject for this promise
      
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
		this.attachmentService.save(file).subscribe(
			val => this.handleUploadSubscription(val, attachment),
			err => this.handleUploadError(attachment),
			( ) => this.handleUploadCompleted(attachment)
		);
	}

	thumbnailImageError(event: Event, attachment: Attachment): void {
		// TODO: Migrate to a logging lib
		console.log("AttachmentsComponent", "Error loading thumbnail image", attachment);
		// attachment.getThumbnailUrl() = undefined;
	}

}
