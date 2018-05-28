import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileStorageService } from '../../services/file-storage.service';
import { HttpEventType } from '@angular/common/http';
import { error } from 'selenium-webdriver';
import { Message } from '../message/message';
import { FileInfo, FileInfoStatus } from '../../classes/file-info';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss'],
	providers: [ FileStorageService ]
})
export class FileUploadComponent implements OnInit {

	@Input() initialFiles: FileInfo[];
	@Output() onChange = new EventEmitter<FileInfo[]>();
	filesInfo: FileInfo[] = [];

  constructor(private fileStorageService: FileStorageService) { }

  ngOnInit() {
		if (this.initialFiles) {
			this.filesInfo = this.filesInfo.concat(this.initialFiles);
		}
	}
	
	onInputFileChange(event: Event) {
		const fileInput = <HTMLInputElement> event.target;
		const files = fileInput.files;
		this.onChange.emit(this.filesInfo);
		for(let i=0; i<files.length; i++) {
			const fileInfo = new FileInfo();
			this.filesInfo.push(fileInfo);
			this.upload(files.item(i), fileInfo);
		}
	}

	private upload(file: File, fileInfo: FileInfo) {
		const uploadObeserver = this.fileStorageService.save(file);
		uploadObeserver.subscribe(v => {
			if (v.type == HttpEventType.UploadProgress) {
				const percentage = Math.round(100 * v.loaded / v.total);
				fileInfo.status = FileInfoStatus.UPLOADING;
				fileInfo.percentageUploaded = percentage;
			} else if (v.type == HttpEventType.Response) {
				let responseBody = JSON.parse(v.body.toString());
				let thumbnailRelativeUrl;
				responseBody._links.forEach(link => {
					if (link.rel == 'thumbnail') {
						thumbnailRelativeUrl = link.href;
					}
				});
				if (thumbnailRelativeUrl) {
					fileInfo.thumbnailUrl = thumbnailRelativeUrl;
					fileInfo.fileId = responseBody.fileId;
				}
			}
		}, err => {
			fileInfo.status = FileInfoStatus.ERROR;
			fileInfo.error = "Error uploading file";
			this.onChange.emit(this.filesInfo);
		}, () =>{
			fileInfo.status = FileInfoStatus.STORED;
			this.onChange.emit(this.filesInfo);
		});
	}

}
