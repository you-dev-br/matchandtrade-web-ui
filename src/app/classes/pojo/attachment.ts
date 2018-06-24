import { Link } from "./link";
import { LinkSupport } from "./link-support";

export class Attachment extends LinkSupport {
	attachmentId: number;
	contentType: string;
	error: string;
	name: string;
	originalUrl: string;
	percentageUploaded: number;
	status: AttachmentStatus;
	thumbnailUrl: string;

	getOriginalUrl(): string {
		const link: Link = this.links.find(v => v.rel == 'original');
		return (link ? link.href : undefined);
	}

	getThumbnailUrl(): string {
		const link: Link = this.links.find(v => v.rel == 'thumbnail');
		return (link ? link.href : undefined);
	}

}

export enum AttachmentStatus {
	DELETED='DELETED',
	ERROR='ERROR',
	READING='READING',
	STORED='STORED',
	UPLOADING='UPLOADING',
}
