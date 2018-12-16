import { Page } from './page';

export class Pagination {
  page: Page;
	totalEntries: number;
  totalPages: number;

  constructor(pageNumber: number, pageSize: number, totalEntries?: number) {
    this.page = new Page(pageNumber, pageSize);
    this.totalPages = 0;
    this.totalEntries = totalEntries ? totalEntries : 0;

    if (pageSize > 0 && this.totalEntries >= pageSize) {
      this.totalPages = Math.trunc(this.totalEntries/pageSize);
    }
    if (this.totalEntries % pageSize > 0) {
      this.totalPages++;
    }
  }
}
