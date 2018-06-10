import { Response } from '@angular/http';

import { FilePojo } from '../pojo/file-pojo';
import { Attachment, AttachmentStatus } from '../pojo/attachment';
import { Transformer } from './transformer';
import { AttachmentsComponent } from '../../components/attachments/attachments.component';

export class AttachmentTransformer extends Transformer<Attachment> {

	public toPojo(filePojo: FilePojo): Attachment {
		const result = new Attachment();
		result.fileId = filePojo.fileId;
		result.name = filePojo.name;
		result.originalUrl = filePojo.originalUrl;
		result.thumbnailUrl = filePojo.thumbnailUrl;
		return result;
	}

}
