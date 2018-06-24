import { Link } from "./link";

export class LinkSupport {
  
  links: Link[];

  constructor(links?: Link[]) {
    this.links = (links ? links : new Array<Link>());
  }

  getLinkHref(): string {
    return this.links.find(l => l.rel == 'self').href;
  }

}
