import { LinkSupport } from './pojo/link-support';

export class Attachment extends LinkSupport {
	attachmentId: string;
	contentType: string;
	name: string;
	getOriginalHref(): string {
		return this.getLinkByRel('original');
	}
	getThumbnailHref(): string {
		return this.getLinkByRel('thumbnail');
	}
}
