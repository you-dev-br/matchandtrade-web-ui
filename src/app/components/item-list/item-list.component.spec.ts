import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub, ActivatedRoute, Router } from '../../../test/router-stubs';

import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { ItemListComponent } from './item-list.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ItemService } from '../../services/item.service';
import { SearchResult } from '../../classes/search/search-result';
import { Item } from '../../classes/pojo/item';

const activatedRouteMock = {
	snapshot: {
		paramMap: {
			get: function (a: any) { return undefined }
		}
	}
}

class ItemServiceMock {
  search(){
    return new Promise<SearchResult<Item>>(() => {});
  };
}

describe('ItemListComponent', () => {
	let component: ItemListComponent;
	let fixture: ComponentFixture<ItemListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				MessageComponent,
				LoadingComponent,
				ItemListComponent,
        PaginationComponent
			]
		})
			.overrideComponent(ItemListComponent, {
				set: {
					providers: [
						{ provide: ActivatedRoute, useValue: activatedRouteMock },
						{ provide: Router, useClass: RouterStub },
						{ provide: ItemService, useClass: ItemServiceMock },
					]
				}
			})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ItemListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
