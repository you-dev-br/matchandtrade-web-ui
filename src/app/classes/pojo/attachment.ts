import { Link } from "./link";
import { LinkSupport } from "./link-support";

export class Attachment extends LinkSupport {
	attachmentId: number;
	contentType: string;
	error: string;
	name: string;
	percentageUploaded: number;
  status: AttachmentStatus;
  
  getOriginalUrl(): string {
    return this.getLinkByRel('original');
  }

  getThumbnailUrl(): string {
    return this.getLinkByRel('thumbnail');
  }
  
}

export enum AttachmentStatus {
	DELETED='DELETED',
	ERROR='ERROR',
	READING='READING',
	STORED='STORED',
	UPLOADING='UPLOADING',
}
