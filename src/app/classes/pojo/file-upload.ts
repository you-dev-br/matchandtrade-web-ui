export class FileUpload {
	error: string;
	fileId: number;
	status: FileUploadStatus;
	percentageUploaded: number;
	thumbnailUrl: string;
	url: string;
}

export enum FileUploadStatus {
	ERROR='ERROR',
	STORED='STORED',
	UPLOADING='UPLOADING',
}
