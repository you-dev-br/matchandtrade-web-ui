import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Attachment } from '../../classes/pojo/attachment';
import { AttachmentTransformer } from '../../classes/transformers/attachment-transformer';
import { Item } from '../../classes/pojo/item';
import { FileService } from '../../services/file.service';
import { Message } from '../message/message';
import { NavigationService } from '../../services/navigation.service';
import { Pagination } from '../../classes/search/pagination';
import { SearchService } from '../../services/search.service';
import { StorageService } from '../../services/storage.service';
import { TradeMembership } from '../../classes/pojo/trade-membership';
import { TradeMembershipService } from '../../services/trade-membership.service';

class ItemView {
	constructor(item: Item) {
		this.href = item._href;
		this.name = item.name;
		this.description = item.description;
	}
	href: string;
	name: string;
	description: string;
	thumbnailUrl: string;
	thumbnailLoaded: boolean;
}

@Component({
  selector: 'app-item-matcher-list',
  templateUrl: './item-matcher-list.component.html',
  styleUrls: ['./item-matcher-list.component.scss'],
  providers: [TradeMembershipService, SearchService, FileService]
})
export class ItemMatcherListComponent implements OnInit {

	items: ItemView[] = Array<ItemView>();
  loading: boolean = true;
  message: Message = new Message();
  pagination: Pagination = new Pagination(1, 10, 0);
  tradeMembership: TradeMembership;
	tradeMembershipHref: string;
	
	attachmentTransformer = new AttachmentTransformer();

  constructor(
    private navigationService: NavigationService,
		private route: ActivatedRoute,
		private fileService: FileService,
    private searchService: SearchService,
    private storageService: StorageService,
    private tradeMembershipService: TradeMembershipService,
	) { }
	
	displayLoadingThumbnail(item: ItemView):boolean {
		return !item.thumbnailLoaded;
	}
	
	displayThumbnailImage(item: ItemView):boolean {
		return item.thumbnailLoaded && (item.thumbnailUrl ? true : false);
	}
	
	displayThumbnailNotAvailable(item: ItemView) {
		return item.thumbnailLoaded && !item.thumbnailUrl;
	}

	classForThumbnail(item: ItemView): string {
		let result = 'thumbnail';
		result += (item.thumbnailUrl ? ' has-thumbnail' : '');
		return result;
	}

  ngOnInit() {
    this.tradeMembershipHref = this.navigationService.obtainData(this.route).tradeMembershipHref;
    this.message.setNavigationMessage(this.navigationService.getNavigationMessage());

    // Remember last visited page
    const lastPage = this.storageService.removeLastItemMatcherListPage();
    this.pagination.page.number = (lastPage ? lastPage : 1);

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
  
  goToPage(pageNumber: number) {
		this.pagination.page.number = pageNumber;
		this.loading = true;
		this.search(this.tradeMembership)
			.then(() => {
				this.storageService.setLastItemMatcherListPage(this.pagination.page.number);
				this.loading = false;
			})
			.catch((e) => this.message.setErrorItems(e));
	}
	
	private loadThumbnail(item: ItemView, filesHref: string) {
		this.fileService.get(filesHref).then(files => {
			if (files[0] && this.attachmentTransformer.toPojo(files[0])) {
				item.thumbnailUrl = this.attachmentTransformer.toPojo(files[0]).thumbnailUrl;
			}
			item.thumbnailLoaded = true;
		});
	}

	onErrorDisplayingThumbnailImage(event: Event, item: ItemView): void {
		// TODO: Migrate to a logging lib
		console.log('ItemMatcherListComponent', 'Error when displaying thumbnail image', event);
		item.thumbnailUrl = undefined;
	}

  private search(tradeMembership: TradeMembership): Promise<any> {
    return this.searchService.searchItemsToMatch(tradeMembership, this.pagination.page).then(searchResults => {
			searchResults.results.forEach(v => {
				const itemProxy = new ItemView(v);
				this.loadThumbnail(itemProxy, v.getFilesHref());
				this.items.push(itemProxy);
			});
      this.pagination = searchResults.pagination;
    });
  }

  navigateToOffer(item: ItemView) {
    this.navigationService.navigate('item-matcher-offer', {tradeMembershipHref: this.tradeMembershipHref, itemHref: item.href});
  }

  navigateBack(): void {
    this.navigationService.back();
	}
	
}
