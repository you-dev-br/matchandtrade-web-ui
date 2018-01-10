import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationService } from '../../../services/authentication.service';
import { LoadingComponent } from '../../loading/loading.component';
import { MessageComponent } from '../../message/message.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { RouterStateSnapshot } from '@angular/router';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub, ActivatedRoute } from '../../../../test/router-stubs';
import { TradeComponent } from './trade.component';
import { Trade } from '../../../classes/pojo/trade';
import { TradeService } from '../../../services/trade.service';

const activatedRouteMock = {
    snapshot: {
        params: {routeAction: 'CREATE'},
        paramMap: {
            get: function(){ return 'hrefMock'}
        }
    }
}

describe('TradeComponent-CREATE', () => {
  let component: TradeComponent;
  let fixture: ComponentFixture<TradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        MessageComponent,
        LoadingComponent,
        TradeComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ]
    })
    .overrideComponent(TradeComponent, {
      set: {
        providers:[
          {provide: ActivatedRoute, useValue: activatedRouteMock},
          {provide: TradeService, useValue: 'tradeServiceDummy'}
        ]
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
      expect(fixture.nativeElement.querySelector('#trade-name').value).toBe('');        
      expect(fixture.nativeElement.querySelector('#trade-state')).toBeFalsy();
    });
  })));

});
