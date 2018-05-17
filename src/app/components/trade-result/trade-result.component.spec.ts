import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { ActivatedRouteMock, NavigationServiceMock } from '../../../test/router-mock';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { NavigationService } from '../../services/navigation.service';

import { PageTitleComponent } from '../page-title/page-title.component';
import { RouterTestingModule } from '@angular/router/testing';

import { TradeResultComponent } from './trade-result.component';
import { TradeService } from '../../services/trade.service';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/pojo/user';
import { Trade, TradeState } from '../../classes/pojo/trade';
import { TradeResult, TradedItem } from '../../classes/pojo/trade-result';

class UserServiceMock {
  getAuthenticatedUser() { return Promise.resolve(new User())}
}

class TradeServiceMock {
  get(href) {
    return new Promise<Trade>((resolve, reject) => {
      let result = new Trade();
      result.name = 'Trade One';
      result.state = TradeState.SUBMITTING_ITEMS;
      resolve(result);
    });
	};
	
  getResultsJson(href: string): Promise<TradeResult> {
		return new Promise<TradeResult>((resolve, reject) => {
			const result = new TradeResult();
			result.totalOfItems = 3;
			result.totalOfNotTradedItems = 1;
			result.totalOfTradedItems = 2;
			result.tradeName = "Trade One";

			let t1 = new TradedItem();
			t1.expanded = true;
			t1.itemId = 1;
			t1.itemName = "Item One";
			t1.receivingItemId = 2;
			t1.receivingItemName = "Item Two";
			t1.receivingUserId = 2;
			t1.receivingUserName = "User Two";
			t1.sendingUserId = 2;
			t1.sendingUserName = "User Two";

			let t2 = new TradedItem();
			result.tradedItems = [];
			result.tradedItems.push(t1);
			result.tradedItems.push(t2);
      resolve(result);
    });
  }
}

describe('trade-result.component', () => {
  let component: TradeResultComponent;
  let fixture: ComponentFixture<TradeResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeResultComponent, MessageComponent, PageTitleComponent, LoadingComponent ]
    })
    .overrideComponent(TradeResultComponent, {
      set: {
        providers:[
          {provide: ActivatedRoute, useValue: new ActivatedRouteMock({tradeHref: 'tradeHrefMock'}) },
          {provide: NavigationService, useClass: NavigationServiceMock},
          {provide: TradeService, useClass: TradeServiceMock},
          {provide: UserService, useClass: UserServiceMock},
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should trade two items', () => {
		fixture.whenStable().then(() => {
			const tradeResult = component.tradeResult;
			expect(tradeResult).toBeDefined();
			expect(tradeResult.totalOfItems).toBe(3);
			expect(tradeResult.totalOfNotTradedItems).toBe(1);
			expect(tradeResult.totalOfTradedItems).toBe(2);
			expect(tradeResult.tradeName).toBe('Trade One');
			expect(tradeResult.tradedItems.length).toBe(2);
		
			const tradeOne = tradeResult.tradedItems.filter(v => (v.itemId == 1))[0];
			expect(tradeOne.itemId).toBe(1);
			expect(tradeOne.itemName).toBe('Item One');
			expect(tradeOne.receivingItemId).toBe(2);
			expect(tradeOne.receivingItemName).toBe('Item Two');
			expect(tradeOne.receivingUserId).toBe(2);
			expect(tradeOne.receivingUserName).toBe('User Two');
			expect(tradeOne.sendingUserId).toBe(2);
			expect(tradeOne.sendingUserName).toBe('User Two');
		});
  });
});
