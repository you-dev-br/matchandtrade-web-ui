import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub, ActivatedRoute, Router } from '../../../test/router-stubs';

import { Item } from '../../classes/pojo/item';
import { ItemListComponent } from './item-list.component';
import { ItemService } from '../../services/item.service';
import { ItemServiceMock } from '../../../test/item-service-mock';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { SearchResult } from '../../classes/search/search-result';
import { Pagination } from '../../classes/search/pagination';

const activatedRouteMock = {
	snapshot: {
		paramMap: {
			get: function (a: any) { return undefined }
		}
	}
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

	it('should display items list', () => {
		component.ngOnInit();
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			expect(fixture.nativeElement.querySelectorAll("td").length).toBe(2);
			expect(fixture.nativeElement.querySelector(".mt-control-panel button")).toBeTruthy();			
		});
		expect(component).toBeTruthy();
	});

	it('should display [no items found message] when there are no items', () => {
    let injectedItemService = fixture.debugElement.injector.get(ItemService);
    spyOn(injectedItemService, 'search').and.callFake((a) =>{
			const searchResult = new SearchResult<Item>(new Array<Item>(), new Pagination(1,10,0));
      return Promise.resolve(searchResult);
		});
		component.ngOnInit();
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			console.log(fixture.nativeElement);
			expect(fixture.nativeElement.querySelector('.not-found-content')).toBeTruthy();
		});
	});	
});
