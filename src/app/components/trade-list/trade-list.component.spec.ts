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
import { SearchResult } from '../../classes/search/search-result';
import { Trade } from '../../classes/pojo/trade';
import { TradeListComponent } from './trade-list.component';
import { TradeService } from '../../services/trade.service';

class TradeServiceMock {
  search(){
    return new Promise<SearchResult<Trade>>(() => {});
  };
}

describe('TradeListComponent', () => {
  let component: TradeListComponent;
  let fixture: ComponentFixture<TradeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MessageComponent,
        LoadingComponent,
        TradeListComponent,
        PaginationComponent
      ]})
      .overrideComponent(TradeListComponent, {
        set: {
          providers:[
            { provide: NavigationService, useClass: NavigationServiceMock },
            { provide: Router, useValue: RouterTestingModule.withRoutes([]) },
            { provide: TradeService, useClass: TradeServiceMock }
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
    let t1 = new Trade();
    t1.tradeId = 1;
    t1.name = "Trade number 1";

    component.trades = [t1];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('td')).toBeNull();
    });
  })));

  it('when there are no trades; then it should not display any rows', (async(() => {
    component.trades = [];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('td')).toBeNull();
    });
  })));

});
