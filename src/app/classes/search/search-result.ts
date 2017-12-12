import { Pagination } from './pagination';

export class SearchResult <T> {
  results: Array<T>;
  pagination: Pagination;

  constructor(results: Array<T>, pagination: Pagination) {
    this.results = results;
    this.pagination = pagination;
  }
}
