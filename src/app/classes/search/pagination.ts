export class Pagination {
  pageSize: number;
	pageNumber: number;
	totalEntries: number;
  totalPages: number;

  constructor(pageNumber: number, size: number, total: number) {
    this.pageNumber = pageNumber;
    this.pageSize = size;
    this.totalEntries = total;
    if (total > size || size > 0) {
      this.totalPages = Math.trunc(total/size)+1;
    }

  }

}
