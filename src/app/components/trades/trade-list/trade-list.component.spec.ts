import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pagination } from '../../../classes/search/pagination';
import { PaginationComponent } from '../../pagination/pagination.component';
import { RouterOutletStubComponent, RouterLinkStubDirective } from '../../../../test/router-stubs';
import { TradeListComponent } from './trade-list.component';
import { Trade } from '../../../classes/pojo/trade';

describe('TradeListComponent', () => {
  let component: TradeListComponent;
  let fixture: ComponentFixture<TradeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TradeListComponent,
        PaginationComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent ]
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
      expect(fixture.nativeElement.querySelector('td')).toBeTruthy();
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
