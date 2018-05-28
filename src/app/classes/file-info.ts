export class FileInfo {
	error: string;
	fileId: number;
	status: FileInfoStatus;
	percentageUploaded: number;
	thumbnailUrl: string;
	url: string;
}

export enum FileInfoStatus {
	ERROR='ERROR',
	STORED='STORED',
	UPLOADING='UPLOADING',
}
