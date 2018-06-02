import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { error } from 'selenium-webdriver';
import { Message } from '../message/message';
import { FileUpload, FileUploadStatus } from '../../classes/pojo/file-upload';
import { FileTransformer } from '../../classes/transformers/file-transformer';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss'],
	providers: [ FileStorageService ]
})
export class FileUploadComponent implements OnInit {

	@Input() initialFiles: FileUpload[];
	@Output() onChange = new EventEmitter<FileUpload[]>();

	files: FileUpload[] = [];
	fileTransformer = new FileTransformer();
	error: string;

  constructor(private fileStorageService: FileStorageService) { }

  ngOnInit() {
		if (this.initialFiles) {
			this.files = this.files.concat(this.initialFiles);
		}
	}

	private handleUploadCompleted(fileUpload: FileUpload) {
		fileUpload.status = FileUploadStatus.STORED;
		this.error = undefined;
		this.onChange.emit(this.files);
	}

	private handleUploadError(fileUpload: FileUpload) {
		fileUpload.status = FileUploadStatus.ERROR;
		fileUpload.error = "Error uploading file";
		this.onChange.emit(this.files);
	}

	private handleUploadSubscription(v: HttpEvent<{}>, fileUpload: FileUpload) {
		if (v.type == HttpEventType.UploadProgress) {
			fileUpload.status = FileUploadStatus.UPLOADING;
			fileUpload.percentageUploaded = Math.round(100 * v.loaded / v.total);
		} else if (v.type == HttpEventType.Response) {
			let responseBody = JSON.parse(v.body.toString());
			let responseFilePojo = this.fileTransformer.toPojo(responseBody);
			let responseFileUpload = this.fileTransformer.toFileUpload(responseFilePojo);
			Object.assign(fileUpload, responseFileUpload);
		}
	}

	isUploadButtonEnabled() {
		return true;
	}
	
	onInputFileChange(event: Event) {
		const inputElement = <HTMLInputElement> event.target;
		const inputFiles = inputElement.files;
		if ((inputFiles.length + this.files.length) > 3) {
			this.error = 'Items cannot have more than 3 images.';
			return;
		}
		this.onChange.emit(this.files);
		for(let i=0; i<inputFiles.length; i++) {
			const fileUpload = new FileUpload();
			this.files.push(fileUpload);
			this.upload(inputFiles.item(i), fileUpload);
		}
	}

	private upload(file: File, fileUpload: FileUpload) {
		const uploadObeserver = this.fileStorageService.save(file);
		uploadObeserver.subscribe(
			val => this.handleUploadSubscription(val, fileUpload),
			err => this.handleUploadError(fileUpload),
			( ) => this.handleUploadCompleted(fileUpload)
		);
	}

}
