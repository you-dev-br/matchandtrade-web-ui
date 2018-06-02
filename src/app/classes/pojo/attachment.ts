export class Attachment {
	error: string;
	fileId: number;
	status: AttachmentStatus;
	percentageUploaded: number;
	thumbnailUrl: string;
}

export enum AttachmentStatus {
	ERROR='ERROR',
	STORED='STORED',
	UPLOADING='UPLOADING',
}
