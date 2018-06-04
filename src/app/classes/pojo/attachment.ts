export class Attachment {
	error: string;
	fileId: number;
	status: AttachmentStatus;
	percentageUploaded: number;
	thumbnailUrl: string;
	originalUrl: string;
}

export enum AttachmentStatus {
	ERROR='ERROR',
	READING='READING',
	STORED='STORED',
	UPLOADING='UPLOADING',
}
