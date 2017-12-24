import { Page } from './page';

export class Pagination {
  page: Page;
	totalEntries: number;
  totalPages: number;

  constructor(pageNumber: number, pageSize: number, totalEntries?: number) {
    this.page = new Page(pageNumber, pageSize);
    if (totalEntries) {
      this.totalEntries = totalEntries;
    } else {
      this.totalEntries = 0;
    }

    if (pageSize > 0 && totalEntries > pageSize) {
      this.totalPages = Math.trunc(totalEntries/pageSize) + 1;
    } else {
      this.totalPages = 0;
    }
  }

}
