import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRouteMock, NavigationServiceMock } from '../../../test/router-mock';
import { Item } from '../../classes/pojo/item';
import { ItemComponent } from './item.component';
import { ItemService } from '../../services/item.service';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { NavigationService } from '../../services/navigation.service';
import { PageTitleComponent } from '../page-title/page-title.component';
import { AttachmentsComponent } from '../attachments/attachments.component';
import { AttachmentService } from '../../services/attachment.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { AttachmentThumbnailComponent } from '../attachment-thumbnail/attachment-thumbnail.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';

class AttachmentServiceMock {}

class ItemServiceMock {
  get(href) {
    return new Promise<Item>((resolve, reject) => {
      let result = new Item();
      result.name = 'itemName';
      resolve(result);
    });
  };
	
	save(item: Item, tradeMembershipHref?: string): Promise<Item> {
    return new Promise<Item>((resolve, reject) => {
			let result: Item = Object.assign({}, item);
			result.itemId = 1;
			result._href = 'itemHrefMocked';
      resolve(result);
    });
  };
}

describe('item.component-view', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule ],
      declarations: [ 
				ItemComponent,
				AttachmentsComponent,
        LoadingComponent,
				MessageComponent,
        PageTitleComponent,
        AttachmentsComponent,
        AttachmentThumbnailComponent,
        ImageModalComponent,
        AttachmentThumbnailComponent,
       ]
    })
    .overrideComponent(ItemComponent, {
      set: {
        providers:[
          { provide: ActivatedRoute, useValue: new ActivatedRouteMock({itemHref:'itemHrefMock'}) },
          { provide: ItemService, useClass: ItemServiceMock },
          { provide: NavigationService, useClass: NavigationServiceMock },
					{ provide: Router, useValue: RouterTestingModule.withRoutes([]) },
					{ provide: AttachmentService, useClass: AttachmentServiceMock },
					{ provide: AuthenticationService, useClass: AttachmentServiceMock }
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

  it('should display data when viewing an existing item', () => {
		component.ngOnInit();
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			expect(fixture.nativeElement.querySelector('#item-name').value).toBe('itemName');
			expect(fixture.nativeElement.querySelector('#save-item-button').disabled).toBeTruthy();
		});
	});

  it('should enable the save button when form data is changed', () => {
		component.ngOnInit();
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			fixture.nativeElement.querySelector('#item-name').value = 'newName';
			fixture.nativeElement.querySelector('#item-name').dispatchEvent(new Event('input'));
			fixture.detectChanges();
			expect(fixture.nativeElement.querySelector('#item-name').value).toBe('newName');
			expect(fixture.nativeElement.querySelector('#save-item-button').disabled).toBeFalsy();
		});
	});

});
