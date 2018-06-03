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

	@Input() attachments: Attachment[];
	@Output() onChange = new EventEmitter<Attachment[]>();

	attachmentTransformer = new AttachmentTransformer();
	attachmentToView;
	error: string;
	fileTransformer = new FileTransformer();

  constructor(private fileStorageService: FileService) { }

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

	isUploadEnabled(): boolean {
		return this.attachments.length < 3;
	}
	
	onInputFileChange(event: Event): void {
		const inputElement = <HTMLInputElement> event.target;
		const inputFiles = inputElement.files;
		if ((inputFiles.length + this.attachments.length) > 3) {
			this.error = 'Items cannot have more than 3 images.';
			return;
		}
		this.onChange.emit(this.attachments);
		for(let i=0; i<inputFiles.length; i++) {
			const fileUpload = new Attachment();
			this.attachments.push(fileUpload);
			this.upload(inputFiles.item(i), fileUpload);
		}
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

}
