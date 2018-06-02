import { Response } from '@angular/http';

import { FilePojo } from '../pojo/file-pojo';
import { Attachment } from '../pojo/attachment';
import { Transformer } from './transformer';
import { AttachmentsComponent } from '../../components/attachments/attachments.component';

export class FileTransformer extends Transformer<FilePojo> {

	public toPojo(json: any): FilePojo {
		const result = new FilePojo();
		result._href = this.extractHref(json._links);
		result.contentType = json.contentType;
		result.fileId = json.fileId;
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
