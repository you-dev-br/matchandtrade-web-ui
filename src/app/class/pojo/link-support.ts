import { Link } from "./link";

export class LinkSupport {
  links: Link[] = new Array<Link>();

  getSelfHref(): string {
    return this.getLinkByRel('self');
  }

  getLinkByRel(rel: string): string {
    const link: Link = this.links.find(v => {
      return v.rel == rel;
    });
    return link ? link.href : undefined;
  }

  setSelfHref(href: string): any {
    const link = new Link('self', href);
    this.links.push(link);
  }
}
