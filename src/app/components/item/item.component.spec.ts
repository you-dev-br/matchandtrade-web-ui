import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub, ActivatedRoute, Router } from '../../../test/router-stubs';

import { ItemComponent } from './item.component';

const activatedRouteMock = {
  snapshot: {
      paramMap: {
          get: function(a: any){ return undefined}
      }
  }
}

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemComponent ]
    })
    .overrideComponent(ItemComponent, {
      set: {
        providers:[
          {provide: ActivatedRoute, useValue: activatedRouteMock},
          {provide: Router, useClass: RouterStub},          
        ]
      }
    })
    .compileComponents();

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
