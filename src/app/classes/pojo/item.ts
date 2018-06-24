import { Link } from './link';

export class Item {
	_href: string;
	itemId: number = null;
	name: string = null;
	description: string = null;
	_links: Link[];
	
	public getAttachmentsHref(): string {
		const link: Link = this._links.find(v => v.rel == 'attachments');
		return (link ? link.href : undefined);
	}

}
