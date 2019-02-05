import { LinkSupport } from './pojo/link-support';

export class Attachment extends LinkSupport {
	attachmentId: number;
	contentType: string;
	name: string;
}
