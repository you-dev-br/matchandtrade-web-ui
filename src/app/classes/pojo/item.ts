import { Link } from './link';
import { LinkSupport } from './link-support';

export class Item extends LinkSupport {
	itemId: number = null;
	name: string = null;
	description: string = null;
	
	public getAttachmentsHref(): string {
    return this.getLinkByRel('attachments');
	}

}
