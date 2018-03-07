import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub, ActivatedRoute, Router } from '../../../test/router-stubs';

import { ItemMatcherOfferComponent } from './item-matcher-offer.component';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { OfferService } from '../../services/offer.service';
import { TradeMembershipService } from '../../services/trade-membership.service';
import { PaginationComponent } from '../pagination/pagination.component';
import { ItemService } from '../../services/item.service';
import { Item } from '../../classes/pojo/item';
import { Page } from '../../classes/search/page';
import { SearchResult } from '../../classes/search/search-result';
import { Pagination } from '../../classes/search/pagination';
import { Offer } from '../../classes/pojo/offer';

describe('ItemMatcherOfferComponent', () => {
  let component: ItemMatcherOfferComponent;
  let fixture: ComponentFixture<ItemMatcherOfferComponent>;

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: function(a: any) {
          if (a) {
            return a.toString();
          } else {
            return 'routeMock';
          }
        }
      }
    }
  }

  class OfferServiceMock {
    search(page: Page, tradeMembershipHref: string, wantedItemId: number): Promise<SearchResult<Offer>> {
      return new Promise<SearchResult<Offer>>((resolve, reject) => {
        const offer = new Offer(1, 2, 3);
        const results = new Array<Offer>();
        results.push(offer);
        const result = new SearchResult<Offer>(results, new Pagination(1,10,1));
        resolve(result);
      });
    }
  }

  // TODO move to a common place as it is also used in item.component-view.spec.ts
  class ItemServiceMock {
    get(href) {
      return new Promise<Item>((resolve, reject) => {
        const item = new Item();
        item.name = 'ItemServiceMock.GET.name';
        item._href = 'ItemServiceMock.GET.href';
        resolve(item);
      });
    };

    search(page: Page, tradeMembershipHref: string): Promise<SearchResult<Item>> {
      return new Promise<SearchResult<Item>>((resolve, reject) => {
        const item1 = new Item();
        item1.name = 'ItemServiceMock.SEARCH.name1';
        item1.itemId = 1;
        item1._href = 'ItemServiceMock.SEARCH.href1';
        const item2 = new Item();
        item2.name = 'ItemServiceMock.SEARCH.name2';
        item2.itemId = 2;
        item2._href = 'ItemServiceMock.SEARCH.href2';
        
        const results = new Array<Item>();
        results.push(item1);
        results.push(item2);
        const searchResult = new SearchResult<Item>(results, new Pagination(1, 10, 2));
        resolve(searchResult);
      });
    }
    
    save(item: Item, tradeMembershipHref?: string): Promise<Item> {
      return new Promise<Item>((resolve, reject) => {
        let result: Item = Object.assign({}, item);
        result.itemId = 1;
        result._href = 'itemHrefMocked';
        resolve(result);
      });
    };
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MessageComponent,
        LoadingComponent,
        ItemMatcherOfferComponent,
        PaginationComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent ],
      })
      .overrideComponent(ItemMatcherOfferComponent, {
        set: {
          providers:[
            { provide: ActivatedRoute, useValue: activatedRouteMock },
            { provide: Router, useClass: RouterStub },
            { provide: ItemService, useClass: ItemServiceMock },
            { provide: OfferService, useClass: OfferServiceMock }
          ]
        }
      })    
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMatcherOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display wanted item name', () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
			expect(fixture.nativeElement.querySelector('.wanted-item-paragraph i').innerHTML).toBe('ItemServiceMock.GET.name');
    });
  });

  it('should display offering items table', () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#offering_items_table')).toBeDefined();
      expect(fixture.nativeElement.querySelector('.item-offer-name').innerHTML).toBe('ItemServiceMock.SEARCH.name1');
    });
  });

  it('should disable [save button] when page loads', () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#save-offer').disabled).toBeTruthy();
    });
  });

  it('should enable [save button] when changing offers selection', () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.nativeElement.querySelector('#offerableItemId_1').click();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#save-offer').disabled).toBeFalsy();
    });
  });

  it('should display current offers as selected checkboxes', () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#offerableItemId_1').checked).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#offerableItemId_2').checked).toBeFalsy();
    });
  });

});
