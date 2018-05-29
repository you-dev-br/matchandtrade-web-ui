import { Link } from './link';

export class Item {
    _href: string;
    itemId: number = null;
    name: string = null;
		description: string = null;
		_links: Link[];
}
