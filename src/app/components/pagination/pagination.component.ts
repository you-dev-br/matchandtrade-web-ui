import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Pagination } from '../../classes/search/pagination';

export enum PaginationButton{NEXT, NONE, PREVIOUS}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() loading: boolean = false;
  @Input() pagination: Pagination;
  @Output() onNextPage: EventEmitter<Pagination>;
  @Output() onPreviousPage: EventEmitter<Pagination>;
  private lastButton: PaginationButton = PaginationButton.NONE;

  constructor() {
    this.onNextPage = new EventEmitter<Pagination>();
    this.onPreviousPage = new EventEmitter<Pagination>();
  }

  nextPage() {
    if (this.isNextPageButtonEnabled()) {
      this.lastButton = PaginationButton.NEXT;
      this.onNextPage.emit(this.pagination);
    }
  }

  previousPage() {
    if (this.isPreviousPageButtonEnabled()) {
      this.lastButton = PaginationButton.PREVIOUS;
      this.onPreviousPage.emit(this.pagination);
    }
  }

  isNextPageButtonEnabled(): boolean {
    if (!this.loading
        && this.pagination
        && this.pagination.page.number * this.pagination.page.size < this.pagination.totalEntries ) {
      return true;
    }
    return false;
  }

  isPreviousPageButtonEnabled(): boolean {
    if (!this.loading
      && this.pagination
      && this.pagination.page.number > 1) {
      return true;
    }
    return false;
  }
 
  isNextPageLoading(): boolean {
    if(this.loading && this.lastButton == PaginationButton.NEXT) {
      return true;
    } else {
      return false;
    }
  }

  isPreviousPageLoading(): boolean {
    if(this.loading && this.lastButton == PaginationButton.PREVIOUS) {
      return true;
    } else {
      return false;
    }
  }

}
