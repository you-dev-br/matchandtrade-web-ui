import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMiniViewComponent } from './item-mini-view.component';
import { AttachmentService } from '../../services/attachment.service';
import { ItemService } from '../../services/item.service';
import { ItemServiceMock } from '../../../test/item-service-mock';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { AttachmentsComponent } from '../attachments/attachments.component';
import { AttachmentThumbnailComponent } from '../attachment-thumbnail/attachment-thumbnail.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { Attachment } from '../../classes/pojo/attachment';

describe('item-mini-view-component', () => {
  let component: ItemMiniViewComponent;
	let fixture: ComponentFixture<ItemMiniViewComponent>;
	
	class AttachmentServiceMock {
		get(attachmentHref: string): Promise<Attachment[]> {
			const attachment = new Attachment();
			attachment.contentType = 'myContentType';
			attachment.attachmentId = 1;
			attachment.name = 'myName';
			attachment.originalUrl = 'myOriginalUrl';
			attachment.thumbnailUrl = 'myThumbnailUrl';
			const result: Attachment[] = [];
			result.push(attachment);
			return Promise.resolve(result);
		}
	}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
			declarations: [ 
        ItemMiniViewComponent,
        LoadingComponent,
        MessageComponent,
        AttachmentsComponent,
        AttachmentThumbnailComponent,
        ImageModalComponent,
        AttachmentThumbnailComponent,
      ],
			providers: [ItemService, AttachmentService]
		})
		.overrideComponent(ItemMiniViewComponent, {
			set: {
				providers: [
					{ provide: ItemService, useClass: ItemServiceMock },
					{ provide: AttachmentService, useClass: AttachmentServiceMock },
				]
			}
		})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMiniViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create mini view', () => {
		component.itemHref = 'myItemHref';
		fixture.whenStable().then(() => {
			expect(component.item.description).toBeDefined();
			expect(component.item.name).toBeDefined();
			expect(component.attachments).toBeDefined();
			expect(component.attachments.length).toBe(1);
		});
		
	});
	
});
