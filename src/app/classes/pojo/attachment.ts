export class Attachment {
	error: string;
	fileId: number;
	name: string;
	originalUrl: string;
	percentageUploaded: number;
	status: AttachmentStatus;
	thumbnailUrl: string;
}

export enum AttachmentStatus {
	DELETED='DELETED',
	ERROR='ERROR',
	READING='READING',
	STORED='STORED',
	UPLOADING='UPLOADING',
}
