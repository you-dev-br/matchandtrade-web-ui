import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub, ActivatedRoute, Router } from '../../../test/router-stubs';

import { Item } from '../../classes/pojo/item';
import { ItemService } from '../../services/item.service';
import { ItemServiceMock } from '../../../test/item-service-mock';
import { ItemMatcherOfferComponent } from './item-matcher-offer.component';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { Offer } from '../../classes/pojo/offer';
import { OfferService } from '../../services/offer.service';
import { Page } from '../../classes/search/page';
import { Pagination } from '../../classes/search/pagination';
import { PaginationComponent } from '../pagination/pagination.component';
import { SearchResult } from '../../classes/search/search-result';
import { TradeMembershipService } from '../../services/trade-membership.service';

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
