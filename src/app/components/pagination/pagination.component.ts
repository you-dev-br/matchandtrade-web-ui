import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Pagination } from '../../classes/search/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() pagination: Pagination;
  @Output() onNextPage: EventEmitter<Pagination>;
  @Output() onPreviousPage: EventEmitter<Pagination>;

  constructor() {
    this.onNextPage = new EventEmitter<Pagination>();
    this.onPreviousPage = new EventEmitter<Pagination>();
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.onNextPage.emit(this.pagination);
    }
  }

  previousPage() {
    if (this.hasPreviousPage()) {
      this.onPreviousPage.emit(this.pagination);
    }
  }

  private hasNextPage(): boolean {
    if (this.pagination
        && this.pagination.page.number * this.pagination.page.size < this.pagination.totalEntries ) {
      return true;
    } else {
      return false;
    }
  }

  private hasPreviousPage(): boolean {
    if (this.pagination && this.pagination.page.number > 1) {
      return true;
    } else {
      return false;
    }
  }

}
