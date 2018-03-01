import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Message } from '../message/message';
import { Item } from '../../classes/pojo/item';
import { SearchService } from '../../services/search.service';
import { TradeMembership } from '../../classes/pojo/trade-membership';
import { TradeMembershipService } from '../../services/trade-membership.service';
import { Pagination } from '../../classes/search/pagination';

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
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private tradeMembershipService: TradeMembershipService,
  ) { }

  ngOnInit() {
    this.tradeMembershipHref = this.route.snapshot.paramMap.get('tradeMembershipHref');

    this.tradeMembershipService.get(this.tradeMembershipHref)
      .then(tradeMembership => {
        this.tradeMembership = tradeMembership;
        return tradeMembership;
      })
      .then(tradeMembership => {
        return this.search(tradeMembership);
			})
      .catch(e => this.message.setErrorItems(e))
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
    this.router.navigate(['item-matcher-offer', {itemHref: item._href, tradeMembershipHref: this.tradeMembershipHref}]);
  }

}
