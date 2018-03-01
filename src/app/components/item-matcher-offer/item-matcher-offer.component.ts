import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CheckableItem } from './checkable-item';
import { Item } from '../../classes/pojo/item';
import { ItemService } from '../../services/item.service';
import { Message } from '../message/message';
import { Offer } from '../../classes/pojo/offer';
import { Pagination } from '../../classes/search/pagination';
import { TradeMembershipService } from '../../services/trade-membership.service';
import { OfferService } from '../../services/offer.service';

@Component({
  selector: 'app-item-matcher-offer',
  templateUrl: './item-matcher-offer.component.html',
  styleUrls: ['./item-matcher-offer.component.scss'],
  providers: [ ItemService, TradeMembershipService, OfferService ]
})
export class ItemMatcherOfferComponent implements OnInit {

  loading: boolean = true;
  offers: CheckableItem[] = new Array<CheckableItem>();
  message: Message = new Message();
  pagination = new Pagination(1, 5, 0);
  tradeMembershipHref: string;
  wantedItem: Item;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private tradeMembershipService: TradeMembershipService,
    private offerService: OfferService
  ) { }

  ngOnInit() {
    const wantedItemHref = this.route.snapshot.paramMap.get("itemHref");
    this.tradeMembershipHref = this.route.snapshot.paramMap.get("tradeMembershipHref");

    this.itemService.get(wantedItemHref).then(v => {
      this.wantedItem = v;
    })
    .then(() => {
      return this.itemService.search(this.pagination.page, this.tradeMembershipHref).then(v => {
        this.offers = this.transformFromItemsToCheckableItems(v.results);
        this.pagination = v.pagination;
      });
    })
    .then(() => {
      this.loading = false;
    });
  }

  nextPage() {
  }

  previousPage() {
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

  save() {
    this.loading = true;
    const promiseOffers = new Array<Promise<Offer>>();
    for(let i=0; i<this.offers.length; i++) {
      if (this.offers[i].checked) {
        const promise = this.offerService.offer(this.tradeMembershipHref, this.offers[i], this.wantedItem);
        promiseOffers.push(promise);
      }
    }
    Promise.all(promiseOffers).then(v => {
      this.message.setInfoItems('Offers saved.');
    })
    .catch(e => this.message.setErrorItems(e))
    .then(() => this.loading = false);
  }

  isSaveEnabled(): boolean {
    return null;
  }

  navigateBack() {
    this.router.navigate(['/item-matcher-list', {tradeMembershipHref: this.tradeMembershipHref}]);
  }

}
