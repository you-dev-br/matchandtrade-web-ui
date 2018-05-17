import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { Item } from '../../classes/pojo/item';
import { ItemListComponent } from './item-list.component';
import { ItemService } from '../../services/item.service';
import { ItemServiceMock } from '../../../test/item-service-mock';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { NavigationService } from '../../../app/services/navigation.service';
import { NavigationServiceMock, ActivatedRouteMock } from '../../../test/router-mock';
import { PaginationComponent } from '../pagination/pagination.component';
import { SearchResult } from '../../classes/search/search-result';
import { Pagination } from '../../classes/search/pagination';
import { PageTitleComponent } from '../page-title/page-title.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('item-list.component', () => {
	let component: ItemListComponent;
	let fixture: ComponentFixture<ItemListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				MessageComponent,
				LoadingComponent,
				ItemListComponent,
				PaginationComponent,
				PageTitleComponent
			]
		})
		.overrideComponent(ItemListComponent, {
			set: {
				providers: [
					{ provide: ActivatedRoute, useValue: new ActivatedRouteMock() },
					{ provide: NavigationService, useClass: NavigationServiceMock },
					{ provide: ItemService, useClass: ItemServiceMock },
					{ provide: Router, useValue:  RouterTestingModule.withRoutes([]) }
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
			expect(fixture.nativeElement.querySelectorAll("td").length).toBe(5);
			expect(fixture.nativeElement.querySelector(".mt-cmd-panel-container")).toBeTruthy();
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
			expect(fixture.nativeElement.querySelector('.not-found-content')).toBeTruthy();
		});
	});	
});
