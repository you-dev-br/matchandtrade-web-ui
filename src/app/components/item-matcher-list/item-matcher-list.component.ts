import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from '../../classes/pojo/item';
import { Message } from '../message/message';
import { NavigationService } from '../../services/navigation.service';
import { Pagination } from '../../classes/search/pagination';
import { SearchService } from '../../services/search.service';
import { TradeMembership } from '../../classes/pojo/trade-membership';
import { TradeMembershipService } from '../../services/trade-membership.service';

@Component({
  selector: 'app-item-matcher-list',
  templateUrl: './item-matcher-list.component.html',
  styleUrls: ['./item-matcher-list.component.scss'],
  providers: [TradeMembershipService, SearchService]
})
export class ItemMatcherListComponent implements OnInit {

	items: Item[] = Array<Item>();
  loading: boolean = true;
  message: Message = new Message();
  pagination: Pagination = new Pagination(1, 5, 0);
  tradeMembership: TradeMembership;
  tradeMembershipHref: string;

  constructor(
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private tradeMembershipService: TradeMembershipService,
  ) { }

  ngOnInit() {
    this.tradeMembershipHref = this.navigationService.obtainData(this.route).tradeMembershipHref;
    this.message.setNavigationMessage(this.navigationService.getNavigationMessage());

    this.tradeMembershipService.get(this.tradeMembershipHref)
      .then(tradeMembership => {
        this.tradeMembership = tradeMembership;
        return tradeMembership;
      })
      .then(tradeMembership => {
        return this.search(tradeMembership);
			})
      .catch(e => {
        this.message.setErrorItems(e);
      })
      .then(() => this.loading = false);
  }
  
  nextPage() {
      this.pagination.page.number++;
      this.loading = true;
      this.search(this.tradeMembership)
        .then(() => this.loading = false)
        .catch((e) => this.message.setErrorItems(e));
  }

  previousPage() {
      this.pagination.page.number--;
      this.loading = true;
      this.search(this.tradeMembership)
        .then(() => this.loading = false)
        .catch((e) => this.message.setErrorItems(e));
  }

  search(tradeMembership: TradeMembership): Promise<any> {
    return this.searchService.searchItemsToMatch(tradeMembership, this.pagination.page).then(searchResults => {
      this.items = searchResults.results;
      this.pagination = searchResults.pagination;
    });
  }

  navigateToOffer(item: Item) {
    this.navigationService.navigate('item-matcher-offer', {tradeMembershipHref: this.tradeMembershipHref, itemHref: item._href});
  }

  navigateBack(): void {
    this.navigationService.back();
  }

}
