import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub, ActivatedRoute, Router } from '../../../test/router-stubs';

import { ItemListComponent } from './item-list.component';

const activatedRouteMock = {
  snapshot: {
      paramMap: {
          get: function(a: any){ return undefined}
      }
  }
}

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ItemListComponent,
       ]
    })
    .overrideComponent(ItemListComponent, {
      set: {
        providers:[
          {provide: ActivatedRoute, useValue: activatedRouteMock},
          {provide: Router, useClass: RouterStub},          
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
