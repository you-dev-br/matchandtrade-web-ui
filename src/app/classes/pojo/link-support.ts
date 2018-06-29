import { Link } from "./link";

export class LinkSupport {
  
  links: Link[] = new Array<Link>();

  constructor(links?: Link[]) {
    this.links = (links ? links : new Array<Link>());
  }

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

}
