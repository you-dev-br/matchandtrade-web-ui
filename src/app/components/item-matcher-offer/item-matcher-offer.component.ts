import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CheckableItem } from './checkable-item';
import { Item } from '../../classes/pojo/item';
import { ItemService } from '../../services/item.service';
import { Pagination } from '../../classes/search/pagination';
import { TradeMembershipService } from '../../services/trade-membership.service';
import { WantItemService } from '../../services/want-item.service';

@Component({
  selector: 'app-item-matcher-offer',
  templateUrl: './item-matcher-offer.component.html',
  styleUrls: ['./item-matcher-offer.component.scss'],
  providers: [ ItemService, TradeMembershipService, WantItemService ]
})
export class ItemMatcherOfferComponent implements OnInit {

  loading: boolean = true;
  offers: CheckableItem[] = new Array<CheckableItem>();
  pagination = new Pagination(1, 5, 0);
  tradeMembershipHref: string;
  wantedItem: Item;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private tradeMembershipService: TradeMembershipService,
    private wantItemService: WantItemService
  ) {
  }

  ngOnInit() {
    const wantedItemHref = this.route.snapshot.paramMap.get("itemHref");
    this.tradeMembershipHref = this.route.snapshot.paramMap.get("tradeMembershipHref");

    this.itemService.get(wantedItemHref).then(v => {
      this.wantedItem = v;
    })
    .then(() => {
      this.itemService.search(this.pagination.page, this.tradeMembershipHref).then(v => {
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
    for(let i=0; this.offers.length; i++) {
      if (this.offers[i].checked) {
        this.wantItemService.want(this.wantedItem, this.offers[i], i+1).then(v => console.log(v));
      }
    }
  }

  isSaveEnabled(): boolean {
    return null;
  }

  navigateBack() {
    this.router.navigate(['/item-matcher-list', {tradeMembershipHref: this.tradeMembershipHref}]);
  }

}
