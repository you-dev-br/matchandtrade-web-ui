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
import { TradeResult } from '../../classes/pojo/trade-result';

class UserServiceMock {
  getAuthenticatedUser() { return Promise.resolve(new User())}
}

class TradeServiceMock {
  get(href) {
    return new Promise<Trade>((resolve, reject) => {
      let result = new Trade();
      result.name = 'tradeName';
      result.state = TradeState.SUBMITTING_ITEMS;
      resolve(result);
    });
  };
  getResultsJson(href: string): Promise<TradeResult> {
    return new Promise<TradeResult>((resolve, reject) => {
      resolve(new TradeResult());
    });
  }
}

describe('TradeResultComponent', () => {
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

  it('please implement me!!!!!', () => {
    expect(component).toBeTruthy();
  });
});
