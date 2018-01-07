import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationService } from '../../../services/authentication.service';
import { Pagination } from '../../../classes/search/pagination';
import { PaginationComponent } from '../../pagination/pagination.component';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub, ActivatedRoute } from '../../../../test/router-stubs';
import { TradeComponent } from './trade.component';
import { Trade } from '../../../classes/pojo/trade';
import { MessageComponent } from '../../message/message.component';
import { LoadingComponent } from '../../loading/loading.component';
import { TradeService } from '../../../services/trade.service';
import { RouterStateSnapshot } from '@angular/router';
import { SearchResult } from '../../../classes/search/search-result';

class TradeServiceMock {
  search(){
    return new Promise<SearchResult<Trade>>(() => {});
  };
  get() {
    return new Promise<SearchResult<Trade>>(() => {});
  }
}

const activatedRouteMock = {
    snapshot: {
        params: {tradeId: 'CREATE'},
        paramMap: {
            get: function(){ return 'hrefMock'}
        }
    }
}

describe('TradeComponent', () => {
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
        RouterOutletStubComponent ],
        }).overrideComponent(TradeComponent, {
          set: {
            providers:[
              {provide: Router, useClass: RouterStub },
              {provide: ActivatedRoute, useValue: activatedRouteMock},
              {provide: TradeService, useClass: TradeServiceMock}]
          }
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when creating a new trade; then it should display an empty form', (async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
        expect(fixture.nativeElement.querySelector('#trade-name').value).toBeFalsy();        
        expect(fixture.nativeElement.querySelector('#trade-state').value).toBeFalsy();
        expect(fixture.nativeElement.querySelector('#trade-state').disabled).toBeTruthy();        
    });
  })));

});
