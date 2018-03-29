import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutletStubComponent, RouterLinkStubDirective, RouterStub, ActivatedRouteStub, ActivatedRoute, Router, NavigationServiceMock } from '../../../test/router-stubs';

import { ItemComponent } from './item.component';
import { ItemService } from '../../services/item.service';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { NavigationService } from '../../services/navigation.service';

const activatedRouteMock = {
  snapshot: {
      paramMap: {
          get: function(a: any){ return {} }
      }
  }
}

describe('ItemComponent-CREATE', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ 
        ItemComponent,
        LoadingComponent,
        MessageComponent,
       ]
    })
    .overrideComponent(ItemComponent, {
      set: {
        providers:[
          {provide: ActivatedRoute, useValue: activatedRouteMock},
          {provide: Router, useClass: RouterStub},
          {provide: NavigationService, useClass: NavigationServiceMock},
          {provide: ItemService, useValue: 'itemServiceDummy'},
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display an empty form', () => {
		fixture.whenStable().then(() => {
			expect(fixture.nativeElement.querySelector('#item-name').value).toBe('');
			expect(fixture.nativeElement.querySelector('#save-item-button').disabled).toBeTruthy();
		});
	});

	it('should enable the save button after editing the form', () => {
		fixture.nativeElement.querySelector('#item-name').value = 'newName';
		fixture.nativeElement.querySelector('#item-name').dispatchEvent(new Event('input'));
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			expect(fixture.nativeElement.querySelector('#save-item-button').disabled).toBeFalsy();
		});
	});

});
