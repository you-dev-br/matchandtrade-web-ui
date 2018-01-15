import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
import { UserService } from '../../../services/user.service';
import { TradeMembershipService } from '../../../services/trade-membership.service';

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
          {provide: TradeService, useValue: 'tradeServiceDummy'},
          {provide: UserService, useValue: 'userServiceDummy'},
          {provide: TradeMembershipService, useValue: 'tradeMembershipServiceDummy'}
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

  it('when creating a new trade; then it should display an empty form', (() => {
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('#trade-name').value).toBe('');
      expect(fixture.nativeElement.querySelector('#trade-state')).toBeFalsy();
      expect(fixture.nativeElement.querySelector('#subscribe-to-trade-button')).toBeFalsy();
      expect(fixture.nativeElement.querySelector('#save-trade-button').disabled).toBeTruthy();
    });
  }));

  it('when creating a new trade; then it should enable the save button after editing the form', (() => {
    fixture.nativeElement.querySelector('#trade-name').value = 'newName';
    // dispatch a DOM event so that Angular learns of input value change.
    fixture.nativeElement.querySelector('#trade-name').dispatchEvent(new Event('input'));
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('#save-trade-button').disabled).toBeFalsy();
    });
  }));

});
