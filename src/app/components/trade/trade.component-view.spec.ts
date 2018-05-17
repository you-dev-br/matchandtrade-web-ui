import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRouteMock, NavigationServiceMock } from '../../../test/router-mock';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { NavigationService } from '../../services/navigation.service';
import { PageTitleComponent } from '../page-title/page-title.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ResponseOptions } from '@angular/http';
import { SearchResult } from '../../classes/search/search-result';
import { TradeComponent } from './trade.component';
import { Trade, TradeState } from '../../classes/pojo/trade';
import { TradeMembershipService } from '../../services/trade-membership.service';
import { TradeMembership, TradeMembershipType } from '../../classes/pojo/trade-membership';
import { TradeService } from '../../services/trade.service';
import { User } from '../../classes/pojo/user';
import { UserService } from '../../services/user.service';

class TradeServiceMock {
  get(href) {
    return new Promise<Trade>((resolve, reject) => {
      let result = new Trade();
      result.name = 'tradeName';
      result.state = TradeState.SUBMITTING_ITEMS;
      resolve(result);
    });
  };
}

class UserServiceMock {
  getAuthenticatedUser() { return Promise.resolve(new User())}
}

class TradeMembershipServiceMock {
  search() {
    let memberships = new Array<TradeMembership>();
    let membership = new TradeMembership();
    membership.type = TradeMembershipType.OWNER;
    memberships.push(membership);
    return Promise.resolve(new SearchResult<TradeMembership>(memberships, null));
   }
}

describe('trade.component-view', () => {
  let component: TradeComponent;
  let fixture: ComponentFixture<TradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        MessageComponent,
        LoadingComponent,
        TradeComponent,
				PageTitleComponent,
				PaginationComponent
      ]
    })
    .overrideComponent(TradeComponent, {
      set: {
        providers:[
          {provide: Router, useValue: RouterTestingModule.withRoutes([]) },
          {provide: ActivatedRoute, useValue: new ActivatedRouteMock({tradeHref: 'tradeHrefMock'}) },
          {provide: NavigationService, useClass: NavigationServiceMock},
          {provide: TradeService, useClass: TradeServiceMock},
          {provide: UserService, useClass: UserServiceMock},
          {provide: TradeMembershipService, useClass: TradeMembershipServiceMock}
        ]
      }
    }).compileComponents();      
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display data when viewing an existing trade', (()=> {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#trade-name').value).toBe('tradeName');
      expect(component.stateFormControl.value).toBe(TradeState.SUBMITTING_ITEMS);
      expect(fixture.nativeElement.querySelector('#trade-state').disabled).toBeFalsy();    
      expect(fixture.nativeElement.querySelector('#subscribe-to-trade-button')).toBeFalsy();
    });
  }));

  it('should disable form fields if user is not the trade owner', (()=> {
    const injectedTradeMembershipService = fixture.debugElement.injector.get(TradeMembershipService);
    spyOn(injectedTradeMembershipService, 'search').and.callFake((a,b,c) => {
      const memberships = new Array<TradeMembership>();
      const membership = new TradeMembership();
      membership.type = TradeMembershipType.MEMBER;
      memberships.push(membership);
      return Promise.resolve(new SearchResult<TradeMembership>(memberships, null));
    });

    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#trade-name').disabled).toBeTruthy();
      expect(component.stateFormControl.value).toBe(TradeState.SUBMITTING_ITEMS);
      expect(fixture.nativeElement.querySelector('#trade-state').disabled).toBeTruthy();    
      expect(fixture.nativeElement.querySelector('#subscribe-to-trade-button')).toBeFalsy();
    });
  }));

  it('should display subscribe button for non-members', (()=> {
    const injectedTradeMembershipService = fixture.debugElement.injector.get(TradeMembershipService);
    spyOn(injectedTradeMembershipService, 'search').and.callFake((a,b,c) => {
        const ro = new ResponseOptions();
        const result = new Response(ro);
        return Promise.reject(result);
    });

    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#subscribe-to-trade-button')).toBeTruthy();
    });
  }));

  it('should display MatchItems button when viewing a trade with MATCHING_ITEMS state', (()=> {
    const injectedTradeService = fixture.debugElement.injector.get(TradeService);
  
    spyOn(injectedTradeService, 'get').and.callFake((a) =>{
      const trade = new Trade();
      trade.state = TradeState.MATCHING_ITEMS;
      return Promise.resolve(trade);
    });
  
    component.ngOnInit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#match-items-button').disabled).toBeFalsy();
    });
  }));  

});
