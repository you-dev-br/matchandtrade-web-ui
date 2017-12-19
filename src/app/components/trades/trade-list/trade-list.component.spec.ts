import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from '../../pagination/pagination.component';
import { TradeListComponent } from './trade-list.component';
import { RouterOutletStubComponent, RouterLinkStubDirective } from '../../../../test/router-stubs';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain row', () => {
    expect(fixture.nativeElement.querySelector('td')).toBeTruthy();
  });
});
