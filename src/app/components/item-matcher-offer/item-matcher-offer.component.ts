import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CheckableItem } from './checkable-item';
import { Item } from '../../classes/pojo/item';
import { ItemService } from '../../services/item.service';
import { Message } from '../message/message';
import { NavigationService } from '../../services/navigation.service';
import { Offer } from '../../classes/pojo/offer';
import { OfferService } from '../../services/offer.service';
import { Page } from '../../classes/search/page';
import { Pagination } from '../../classes/search/pagination';
import { TradeMembershipService } from '../../services/trade-membership.service';
import { SearchResult } from '../../classes/search/search-result';
import { promise } from 'selenium-webdriver';

@Component({
  selector: 'app-item-matcher-offer',
  templateUrl: './item-matcher-offer.component.html',
  styleUrls: ['./item-matcher-offer.component.scss'],
  providers: [ ItemService, OfferService ]
})
export class ItemMatcherOfferComponent implements OnInit {

  dirty: boolean = false;
  loading: boolean = true;
  message: Message = new Message();
  offerableItems: CheckableItem[] = new Array<CheckableItem>();
  originalOffers: Offer[] = new Array<Offer>();
  pagination = new Pagination(1, 20, 0);
  tradeMembershipHref: string;
  wantedItem: Item;

  constructor(
    private itemService: ItemService,
    private navigationService: NavigationService,
    private offerService: OfferService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.tradeMembershipHref = this.navigationService.obtainData(this.route).tradeMembershipHref
    const wantedItemHref = this.navigationService.obtainData(this.route).itemHref;
    this.itemService.get(wantedItemHref)
      .then(v => this.wantedItem = v)
      .then(() => this.fetchOfferableItems(this.pagination.page))
      .then(() => this.fetchOffers())
      .then(() => this.initCheckableItems())
      .catch(e => this.message.setErrorItems(e))
      .then(() => this.loading = false);
  }

  private initCheckableItems(): void {
    this.originalOffers.forEach(offer => {
      this.offerableItems.forEach(offerableItem => {
        if (offerableItem.itemId == offer.offeredItemId) {
          offerableItem.setChecked(true);
        }
      });
    });
  }

  isSaveEnabled(): any {
    return (this.dirty ? null : 'disabled');
  }

  /**
   * Fetch all offers so we can the items with offers
   */
  private fetchOffers(): Promise<void> {
    return this.offerService.search(this.pagination.page, this.tradeMembershipHref, this.wantedItem.itemId)
      // Load the first page
      .then(v => {
        this.originalOffers = this.originalOffers.concat(v.results);
        return v.pagination;
      })
      // If there is more than one page; then load all subsequent pages
      .then(v => {
        const promises = new Array<Promise<SearchResult<Offer>>>();
        for (let i=2; i<=v.totalPages; i++) {
          promises.push(this.offerService.search(new Page(i, v.page.size), this.tradeMembershipHref, this.wantedItem.itemId));  
        }
        return Promise.all(promises);
      })
      .then(v => {
        v.forEach(searchResult => this.originalOffers = this.originalOffers.concat(searchResult.results));
      });
  }

  /**
   * Fetch all offerable items so we can tick the ones with offers
   */
  private fetchOfferableItems(page: Page): Promise<void> {
    return this.itemService.search(page, this.tradeMembershipHref)
      // Load the first page
      .then(v => {
        const transformedResults = this.transformFromItemsToCheckableItems(v.results);
        this.offerableItems = this.offerableItems.concat(transformedResults);
        this.pagination = v.pagination;
        return v.pagination;
      })
      // If there is more than one page; then load all subsequent pages      
      .then(v => {
        const promises = new Array<Promise<SearchResult<Item>>>();
        for (let i=2; i<=v.totalPages; i++) {
          promises.push(this.itemService.search(new Page(i, v.page.size), this.tradeMembershipHref));
        }
        return Promise.all(promises);
      })
      .then(v => {
        v.forEach(searchResult => {
          const transformedResults = this.transformFromItemsToCheckableItems(searchResult.results);
          this.offerableItems = this.offerableItems.concat(transformedResults);            
        });
      });
  }
  
  navigateBack(): void {
    this.navigationService.back();
  }

	goToPage(pageNumber: number) {
		// We need to create a new instance of pagination so the pagination.component can detect the changes
		// See https://stackoverflow.com/questions/34796901/angular2-change-detection-ngonchanges-not-firing-for-nested-object
		let newPaginationInstance = new Pagination(0, 0, 0);
		Object.assign(newPaginationInstance, this.pagination);
		newPaginationInstance.page.number = pageNumber;
		this.pagination = newPaginationInstance;
	}

  save() {
    this.loading = true;
    const deleteOfferPromises = new Array<Promise<any>>();
    this.originalOffers.forEach(v => {
      const promise = this.offerService.delete(this.tradeMembershipHref, v.offerId);
      deleteOfferPromises.push(promise);
    });
    Promise.all(deleteOfferPromises)
      .then(() => {
        const createOfferPromises = new Array<Promise<any>>();
        this.offerableItems.filter(v => v.checked()).forEach(v => {
          const promise = this.offerService.offer(this.tradeMembershipHref, v, this.wantedItem);
          createOfferPromises.push(promise);
        });
        return Promise.all(createOfferPromises);
      })
      .then(v => {
        this.navigationService.setNavigationMessage('Offer saved.');
        this.navigateBack();  
      })
      .catch(e => this.message.setErrorItems(e));
  }

  toogleOfferableItem(checkableItem: CheckableItem) {
    checkableItem.toogleChecked();
    this.dirty = true;
  }

  private transformFromItemsToCheckableItems(items: Item[]): CheckableItem[] {
    const result: CheckableItem[] = new Array<CheckableItem>();
    items.forEach(item => {
      let checkableItem = new CheckableItem();
      Object.assign(checkableItem, item);
      result.push(checkableItem);
    });
    return result;
  }

  obtainOfferableItemsForCurrentPage(): Array<CheckableItem> {
    const result: CheckableItem[] = new Array<CheckableItem>();
    const startIndexOfCurrentPage = (this.pagination.page.number - 1) * this.pagination.page.size;
    let endIndexOfCurrentPage = this.pagination.page.number * this.pagination.page.size;
    endIndexOfCurrentPage = (endIndexOfCurrentPage >= this.offerableItems.length ? this.offerableItems.length : endIndexOfCurrentPage);
    for (let i=startIndexOfCurrentPage; i<endIndexOfCurrentPage; i++) {
      result.push(this.offerableItems[i]);
    }
    return result;
  }

}
