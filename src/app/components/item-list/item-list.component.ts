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
    this.message.setNavigationMessage(this.navigationService.getNavigationMessage());
    this.search();
  }

  createItem() {
    this.navigationService.navigate('items', {tradeMembershipHref: this.tradeMembershipHref});
  }

  deleteItem(item: Item) {
    this.loading = true;
    this.itemService.delete(item._href)
      .then(() =>{
        this.items = this.items.filter(v => {
          return v.itemId != item.itemId;
        });
      })
      .then(() => this.search())
      .catch(e => this.message.setErrorItems(e))
      .then(() => this.message.setInfoItems('Item deleted.'));
  }

  navigateToItem(item: Item) {
    this.navigationService.navigate('items', {itemHref: item._href});
  }
	
	nextPage() {
		this.loading = true;
		this.pagination.page.number++;
		this.search();
	}

	previousPage() {
    this.loading = true;
    this.pagination.page.number--;
    this.search();
	}

  search(): void {
    this.itemService.search(this.pagination.page, this.tradeMembershipHref)
      .then(v => {
        this.items = v.results;
        this.pagination = v.pagination;
      })
      .catch(e => this.message.setErrorItems(e))
      .then(() => this.loading = false);
  }

  navigateBack() {
    this.navigationService.back();
  }

}
