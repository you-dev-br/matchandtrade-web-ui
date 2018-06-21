import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRouteMock, NavigationServiceMock } from '../../../test/router-mock';
import { ItemComponent } from './item.component';
import { ItemService } from '../../services/item.service';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { NavigationService } from '../../services/navigation.service';
import { PageTitleComponent } from '../page-title/page-title.component';
import { AttachmentsComponent } from '../attachments/attachments.component';
import { FileService } from '../../services/file.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { AttachmentThumbnailComponent } from '../attachment-thumbnail/attachment-thumbnail.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';

class FileServiceMock {}

describe('item.component-create', () => {
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
          {provide: ActivatedRoute, useValue: new ActivatedRouteMock()},
          {provide: Router, useValue: RouterTestingModule.withRoutes([])},
          {provide: NavigationService, useClass: NavigationServiceMock},
					{provide: ItemService, useValue: 'itemServiceDummy'},
					{provide: FileService, useClass: FileServiceMock },
					{provide: AuthenticationService, useClass: FileServiceMock },
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

	it('should enable the save button after editing the form', () => {
		fixture.nativeElement.querySelector('#item-name').value = 'newName';
		fixture.nativeElement.querySelector('#item-name').dispatchEvent(new Event('input'));
		fixture.detectChanges();
		fixture.whenStable().then(() => {
			expect(fixture.nativeElement.querySelector('#save-item-button').disabled).toBeFalsy();
		});
	});

});
