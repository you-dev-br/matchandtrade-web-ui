import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub } from '../../../test/router-stubs';
import { ItemHubComponent } from './item-hub.component';
import { TradeMembership, TradeMembershipType } from '../../classes/pojo/trade-membership';
import { TradeMembershipService } from '../../services/trade-membership.service';
import { ItemListComponent } from '../item-list/item-list.component';


class TradeMembershipServiceMock {
  get() {
    let membership = new TradeMembership();
    membership.tradeMembershipId = 1;
    membership.tradeId = 1;
    membership.userId = 1;
    membership.type = TradeMembershipType.OWNER;
    return Promise.resolve(membership);
   }
}

const activatedRouteMock = {
  snapshot: {
      params: {routeAction: 'VIEW'},
      paramMap: {
          get: function(v) {
            return v;
          }
      }
  }
}

describe('ItemHubComponent', () => {
  let component: ItemHubComponent;
  let fixture: ComponentFixture<ItemHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemHubComponent, ItemListComponent ]
    })
    .overrideComponent(ItemHubComponent, {
      set: {
        providers:[
          {provide: ActivatedRoute, useValue: activatedRouteMock},
          {provide: Router, useClass: RouterStub},
          {provide: TradeMembershipService, useClass: TradeMembershipServiceMock}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
