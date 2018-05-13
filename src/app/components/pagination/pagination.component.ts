import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

import { Pagination } from '../../classes/search/pagination';
import { KeyValuePair } from '../../classes/pojo/key-value-pair';
import { isNumber } from 'util';

export enum PaginationButton{NEXT, NONE, PREVIOUS}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() loading: boolean = false;
	@Input() pagination: Pagination;
	@Output() onGoToPage = new EventEmitter<number>();
	interval: any[];
	currentPage: number;

  constructor() {}
	
	ngOnInit() {
		const totalPages = this.pagination.totalPages;
		// Only display the pagination if there is more than one page
		if (totalPages < 2) {
			return;
		}
		this.interval = [];
		this.currentPage = this.pagination.page.number;
		const pageNumber = this.pagination.page.number;
		const maxPagesToDisplay = 5;

		// First, we insert the current page
		this.addToPageInterval(pageNumber, maxPagesToDisplay, totalPages);

		// When page number is the first page, we populate pageInterval in ascending order
		if(pageNumber == 1) {
			for(let i=2; i<=maxPagesToDisplay; i++) {
				this.addToPageInterval(i, maxPagesToDisplay, totalPages);
			}
		}
		// When page number is the last page, we populate pageInterval in descending order
		else if(pageNumber == totalPages) {
			for(let i=totalPages-1; i>totalPages-maxPagesToDisplay; i--) {
				this.addToPageInterval(i, maxPagesToDisplay, totalPages);
			}
		}
		// When page number is somewhere in the middle, we populate rigth and left
		else {
			for(let i=1; i<maxPagesToDisplay; i++) {
				this.addToPageInterval(pageNumber+i, maxPagesToDisplay, totalPages);				
				this.addToPageInterval(pageNumber-i, maxPagesToDisplay, totalPages);
			}
		}

		// Sort it numerically. See: https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
		this.interval.sort((a, b) => a - b);

		// Add heading ellipis
		if (totalPages > maxPagesToDisplay && this.currentPage > Math.ceil(maxPagesToDisplay/2)) {
			this.interval.unshift('...');
		}

		// Add tailing ellipsis
		if (this.interval[this.interval.length-1] < totalPages) {
			this.interval.push('...');
		}

	}

	ngOnChanges(changes) {
		if(this.pagination && changes["pagination"]) {
			this.pagination = changes["pagination"].currentValue;
			this.ngOnInit();
		}
	}

	private addToPageInterval(pageNumber: number, maxIntervalSize: number, totalPages) {
		if (this.interval.length < maxIntervalSize && pageNumber > 0 && pageNumber <= totalPages) {
			this.interval.push(pageNumber);
		}
	}

	goToPage(targetPage: number) {
		if (isNumber(targetPage) && targetPage != this.currentPage) {
			this.onGoToPage.emit(targetPage);
		}
 	}

  nextPage() {
    if (this.isNextPageButtonEnabled()) {
			const targetPage = this.currentPage + 1;
      this.onGoToPage.emit(targetPage);
    }
	}
	
	pageClass(page: any): string {
		let result = 'button is-small page ';
		result += (page == this.currentPage ? 'current-page' : ' ');
		result += (page == '...' ? 'ellipsis' : '');
		return result;
	}

	previousPage() {
    if (this.isPreviousPageButtonEnabled()) {
			const targetPage = this.currentPage - 1;
      this.onGoToPage.emit(targetPage);
    }
  }

  isNextPageButtonEnabled(): boolean {
    if (!this.loading
        && this.pagination
				&& this.pagination.page
				&& this.pagination.page.number * this.pagination.page.size < this.pagination.totalEntries ) {
      return true;
    }
    return false;
  }

  isPreviousPageButtonEnabled(): boolean {
    if (!this.loading
			&& this.currentPage > 1) {
      return true;
    }
    return false;
  }
	
}
