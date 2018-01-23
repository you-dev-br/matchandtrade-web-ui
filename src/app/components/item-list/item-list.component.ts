import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Message } from '../message/message';
import { Item } from '../../classes/pojo/item';
import { ItemService } from '../../services/item.service';
import { Page } from '../../classes/search/page';
import { Pagination } from '../../classes/search/pagination';
import { NotFoundException } from '../../classes/exceptions/service-exceptions';

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
  pagination: Pagination;

  @Input() tradeMembershipHref: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService) {
      this.pagination = new Pagination(1, 10, 0);
    }

  ngOnInit() {
    this.tradeMembershipHref = this.route.snapshot.paramMap.get('tradeMembershipHref');
    this.search();
  }

  createItem() {
    this.router.navigate(['items', {tradeMembershipHref: this.tradeMembershipHref}]);
	}

  navigateToItem(item: Item) {
    this.router.navigate(['items', {itemHref: item._href}]);
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
				if (!(e instanceof NotFoundException)) {
					this.message.setErrorItems(e);
				}
				this.loading = false;
			});
  }

}
