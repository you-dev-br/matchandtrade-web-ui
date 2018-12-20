import { Pagination } from './pagination';

export class SearchResult <T> {
  results: T[];
  pagination: Pagination;

  constructor(results: T[], pagination: Pagination) {
    this.results = results;
    this.pagination = pagination;
	}
	
	isEmpty(): boolean {
		return !this.pagination.totalEntries || this.pagination.totalEntries < 1;
	}
}
