import { Attachment } from '../pojo/attachment';
import { Transformer } from './transformer';

export class AttachmentTransformer extends Transformer<Attachment> {

	public toPojo(json: any): Attachment {
		const result = new Attachment(json._links);
		result.contentType = json.contentType;
		result.attachmentId = json.attachmentId;
		result.name = json.name;
		if (json._links) {
			const thumbnailLink = json._links.find(v => v.rel == 'thumbnail');
			result.thumbnailUrl = (thumbnailLink ? thumbnailLink.href : undefined)
			const originalLink = json._links.find(v => v.rel == 'original');
			result.originalUrl = (originalLink ? originalLink.href : undefined);
		}
		return result;
	}

}
