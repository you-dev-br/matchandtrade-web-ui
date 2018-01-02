import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/authentication.service';
import { Pagination } from '../../../classes/search/pagination';
import { PaginationComponent } from '../../pagination/pagination.component';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub } from '../../../../test/router-stubs';
import { TradeListComponent } from './trade-list.component';
import { Trade } from '../../../classes/pojo/trade';
import { ErratumComponent } from '../../erratum/erratum.component';
import { LoadingComponent } from '../../loading/loading.component';
import { TradeService } from '../../../services/trade.service';
import { RouterStateSnapshot } from '@angular/router/src/router_state';
import { SearchResult } from '../../../classes/search/search-result';

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
        ErratumComponent,
        LoadingComponent,
        TradeListComponent,
        PaginationComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent ],
        }).overrideComponent(TradeListComponent, {
          set: {
            providers:[
              {provide: Router, useClass: RouterStub },
              {provide: TradeService, useClass: TradeServiceMock}]
          }
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when there are trades; then should display rows', (async(() => {
    let t1 = new Trade();
    t1.tradeId = 1;
    t1.name = "Trade number 1";

    component.trades = [t1];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('td')).toBeNull();
    });
  })));

  it('when there are no trades; then should not display any rows', (async(() => {
    component.trades = [];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('td')).toBeNull();
    });
  })));

});
