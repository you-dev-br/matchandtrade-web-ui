import { Pagination } from './pagination';

export class SearchResult <T> {
  results: T[];
  pagination: Pagination;

  constructor(results: T[], pagination: Pagination) {
    this.results = results;
    this.pagination = pagination;
  }
}
