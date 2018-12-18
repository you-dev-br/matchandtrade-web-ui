import { Link } from "./link";

export class LinkSupport {
  links: Link[] = new Array<Link>();

	// TODO: Rename
  getHref(): string {
    return this.getLinkByRel('self');
  }

  getLinkByRel(rel: string): string {
    const link = this.links.find(v => v.rel == rel);
    if (link) {
      return link.href;
    }
    return undefined;
	}
	
	// TODO: Rename
	setHref(href: string): any {
		const link = new Link('self', href);
		this.links.push(link);
	}
}
