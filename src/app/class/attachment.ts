import { LinkSupport } from './pojo/link-support';

export class Attachment extends LinkSupport {
	attachmentId: string;
	contentType: string;
	name: string;
	getThumbnailHref(): string {
		return '/matchandtrade-api/essences/' + this.getLinkByRel('thumbnail');
	}
}
