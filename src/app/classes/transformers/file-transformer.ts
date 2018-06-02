import { Response } from '@angular/http';

import { FilePojo } from '../pojo/file-pojo';
import { FileUpload } from '../pojo/file-upload';
import { Transformer } from './transformer';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';

export class FileTransformer extends Transformer<FilePojo> {

    public toPojo(json: any): FilePojo {
        const result = new FilePojo();
				result._href = this.extractHref(json._links);
				result.contentType = json.contentType;
				result.fileId = json.fileId;
				result.name = json.name;
				if (json._links) {
					const thumbnailLink = json._links.find(v => v.rel == 'thumbnail');
					result.thumbnailUrl = (thumbnailLink ? thumbnailLink.href : undefined )
					const originalLink = json._links.find(v => v.rel == 'original');
					result.originalUrl = (originalLink ? originalLink.href : undefined);
				}
        return result;
		}
		
		public toFileUpload(filePojo: FilePojo): FileUpload {
			const result = new FileUpload();
			result.fileId = filePojo.fileId;
			result.thumbnailUrl = filePojo.thumbnailUrl;
			return result;
		}

}
