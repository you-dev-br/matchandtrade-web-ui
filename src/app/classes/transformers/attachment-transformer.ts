import { Attachment } from '../pojo/attachment';
import { Transformer } from './transformer';

export class AttachmentTransformer extends Transformer<Attachment> {

  public toPojo(json: any): Attachment {
    const result = new Attachment(json._links);
    result.contentType = json.contentType;
    result.attachmentId = json.attachmentId;
    result.name = json.name;
    return result;
  }

}
