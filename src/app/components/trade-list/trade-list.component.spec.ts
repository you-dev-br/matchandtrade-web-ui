import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from '../../services/authentication.service';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { NavigationService } from '../../services/navigation.service';
import { NavigationServiceMock } from '../../../test/router-mock';
import { Pagination } from '../../classes/search/pagination';
import { PaginationComponent } from '../pagination/pagination.component';
import { PageTitleComponent } from '../page-title/page-title.component';
import { SearchResult } from '../../classes/search/search-result';
import { Trade, TradeState } from '../../classes/pojo/trade';
import { TradeListComponent } from './trade-list.component';
import { TradeService } from '../../services/trade.service';
import { TradeMembershipService } from '../../services/trade-membership.service';
import { HttpService } from '../../services/http.service';
import { TradeMembership, TradeMembershipType } from '../../classes/pojo/trade-membership';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/pojo/user';
import { SearchCriteria } from '../../classes/search/search-criteria';

class TradeServiceMock {
  search(){
    return new Promise<SearchResult<Trade>>((resolve, reject) => {
			const trade = new Trade();
			trade.tradeId = 1;
			trade.name = "Trade number 1";
			trade.state = TradeState.SUBMITTING_ITEMS;
			const result = new SearchResult([trade], new Pagination(1,1,1));
			resolve(result);
		});
  };
}

class TradeMembershipServiceMock {
  search(a?:any, b?:any, c?:any, d?:any) {
    let memberships = new Array<TradeMembership>();
		let membership = new TradeMembership();
		membership.tradeId = 1;
		membership.tradeMembershipId = 1;
		membership.userId = 1;
    membership.type = TradeMembershipType.OWNER;
    memberships.push(membership);
    return Promise.resolve(new SearchResult<TradeMembership>(memberships, null));
   }
}

class UserServiceMock {
	get(userId: number): Promise<User> {
		return new Promise<User>((resolve, reject) => {
			const result = new User();
			result.email = "test@test.com";
			result.name = "User test";
			result.userId = 1;
			resolve(result);
		});
	}

  getAuthenticatedUser() { return Promise.resolve(new User())}
}

describe('trade-list.component', () => {
  let component: TradeListComponent;
  let fixture: ComponentFixture<TradeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MessageComponent,
        LoadingComponent,
        TradeListComponent,
				PaginationComponent,
				PageTitleComponent
      ]})
      .overrideComponent(TradeListComponent, {
        set: {
          providers:[
            { provide: NavigationService, useClass: NavigationServiceMock },
            { provide: Router, useValue: RouterTestingModule.withRoutes([]) },
						{ provide: TradeService, useClass: TradeServiceMock },
						{ provide: TradeMembershipService, useClass: TradeMembershipServiceMock },
						{ provide: UserService, useClass: UserServiceMock},
 
          ]
         }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when there are trades; then it should display rows', (async(() => {
    fixture.whenStable().then(() => {
			expect(component.trades).toBeDefined();
			const trade = component.trades[0];
			expect(trade).toBeDefined();
			expect(trade.name).toBe('Trade number 1');
			expect(trade.tradeId).toBe(1);
			expect(trade.state).toBe(TradeState.SUBMITTING_ITEMS);
			expect(trade.organizerName).toBe('User test');
    });
  })));

});
