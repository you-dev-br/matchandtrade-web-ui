import { Transformer } from './transformer';
import { HttpResponse } from '@angular/common/http';
import { Attachment } from '../attachment';

export class AttachmentTransformer extends Transformer<Attachment>{
  toPojo(anyObject: any): Attachment {
		const pojo = this.buildBasePojo(anyObject);
    const result = new Attachment();
		result.links = this.buildLinks(pojo._links);
		result.attachmentId = pojo.attachmentId;
		result.contentType = pojo.contentType;
		result.name = pojo.name;
    return result;
	}
}
