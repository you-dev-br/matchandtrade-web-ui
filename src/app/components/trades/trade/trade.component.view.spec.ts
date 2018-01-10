import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationService } from '../../../services/authentication.service';
import { Pagination } from '../../../classes/search/pagination';
import { PaginationComponent } from '../../pagination/pagination.component';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub, ActivatedRoute } from '../../../../test/router-stubs';
import { TradeComponent } from './trade.component';
import { Trade, TradeState } from '../../../classes/pojo/trade';
import { MessageComponent } from '../../message/message.component';
import { LoadingComponent } from '../../loading/loading.component';
import { TradeService } from '../../../services/trade.service';
import { RouterStateSnapshot } from '@angular/router';
import { SearchResult } from '../../../classes/search/search-result';

class TradeServiceMock {
  get() {
    return new Promise<Trade>((resolve, reject) => {
      let trade = new Trade();
      trade.tradeId = 123;
      trade.name = "name";
      trade.state = TradeState.SUBMITTING_ITEMS;
      resolve(trade);
    });
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

describe('TradeComponent', () => {
  let component: TradeComponent;
  let fixture: ComponentFixture<TradeComponent>;
  let tradeService: TradeServiceMock;

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
            {provide: TradeService, useClass: TradeServiceMock}]            
        }
      }).compileComponents();
      
    this.tradeService = TestBed.get(TradeServiceMock);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display trade data when viewing an existing trade', (() => {
    fixture.detectChanges();
    component.ngOnInit();
    spyOn(this.tradeService, 'get').and.returnValue(Promise.resolve(false));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#trade-name').value).toBe('name');
      expect(component.stateFormControl.value).toBe(TradeState.SUBMITTING_ITEMS);
      expect(fixture.nativeElement.querySelector('#trade-state').disabled).toBeFalsy();    
    });
  }));

});
