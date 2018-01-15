import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Response, ResponseOptions } from '@angular/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub, ActivatedRoute } from '../../../../test/router-stubs';

import { AuthenticationService } from '../../../services/authentication.service';
import { LoadingComponent } from '../../loading/loading.component';
import { MessageComponent } from '../../message/message.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { RouterStateSnapshot } from '@angular/router';
import { SearchResult } from '../../../classes/search/search-result';
import { TradeComponent } from './trade.component';
import { Trade, TradeState } from '../../../classes/pojo/trade';
import { TradeMembershipService } from '../../../services/trade-membership.service';
import { TradeMembership, TradeMembershipType } from '../../../classes/pojo/trade-membership';
import { TradeService } from '../../../services/trade.service';
import { User } from '../../../classes/pojo/user';
import { UserService } from '../../../services/user.service';

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

const activatedRouteMock = {
    snapshot: {
        params: {routeAction: 'VIEW'},
        paramMap: {
            get: function(){ return 'hrefMock'}
        }
    }
}

describe('TradeComponent-VIEW', () => {
  let component: TradeComponent;
  let fixture: ComponentFixture<TradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        MessageComponent,
        LoadingComponent,
        TradeComponent,
        PaginationComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
      providers: [ TradeServiceMock ]
      }).overrideComponent(TradeComponent, {
        set: {
          providers:[
            {provide: Router, useClass: RouterStub },
            {provide: ActivatedRoute, useValue: activatedRouteMock},
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

  it('should display trade data when viewing an existing trade', (()=> {
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
    let injectedTradeMembershipService = fixture.debugElement.injector.get(TradeMembershipService);
    spyOn(injectedTradeMembershipService, 'search').and.callFake((a,b,c) => {
      let memberships = new Array<TradeMembership>();
      let membership = new TradeMembership();
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
    let injectedTradeMembershipService = fixture.debugElement.injector.get(TradeMembershipService);
    spyOn(injectedTradeMembershipService, 'search').and.callFake((a,b,c) => {
        let ro = new ResponseOptions();
        let result = new Response(ro);
        result.status = 404;
        return Promise.reject(result);
    });

    component.ngOnInit();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#subscribe-to-trade-button')).toBeTruthy();
    });
  }));

});
