export class FileInfo {
	status: FileInfoStatus;
	thumbnailUrl: string;
	url: string;
	percentageUploaded: number;
	error: string;
}

export enum FileInfoStatus {
	ERROR='ERROR',
	STORED='STORED',
	UPLOADING='UPLOADING',
}
