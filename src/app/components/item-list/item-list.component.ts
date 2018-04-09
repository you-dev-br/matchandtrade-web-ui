import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Message } from '../message/message';
import { Item } from '../../classes/pojo/item';
import { ItemService } from '../../services/item.service';
import { NavigationService } from '../../services/navigation.service';
import { Page } from '../../classes/search/page';
import { Pagination } from '../../classes/search/pagination';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  providers: [ItemService]
})
export class ItemListComponent implements OnInit {

  items: Item[];
  loading: boolean = true;
  message: Message = new Message();
  pagination: Pagination = new Pagination(1, 10, 0);

  @Input() tradeMembershipHref: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {
    this.tradeMembershipHref = this.navigationService.obtainData(this.route).tradeMembershipHref;
    this.search();
  }

  createItem() {
    this.navigationService.navigate('items', {tradeMembershipHref: this.tradeMembershipHref});
	}

  navigateToItem(item: Item) {
    this.navigationService.navigate('items', {itemHref: item._href});
  }
	
	nextPage() {
		this.pagination.page.number++;
		this.loading = true;
		this.search();
	}

	previousPage() {
			this.pagination.page.number--;
			this.loading = true;
			this.search();
	}

  search(): void {
    this.itemService.search(this.pagination.page, this.tradeMembershipHref)
      .then(v => {
        this.items = v.results;
        this.pagination = v.pagination;
        this.loading = false;
      })
      .catch(e => {
				this.message.setErrorItems(e);
				this.loading = false;
			});
  }

  navigateBack() {
    this.navigationService.back();
  }

}
