import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMiniViewComponent } from './item-mini-view.component';
import { Item } from '../../classes/pojo/item';
import { Link } from '../../classes/pojo/link';
import { AttachmentService } from '../../services/attachment.service';
import { FilePojo } from '../../classes/pojo/file-pojo';
import { ItemService } from '../../services/item.service';
import { ItemServiceMock } from '../../../test/item-service-mock';
import { LoadingComponent } from '../loading/loading.component';
import { MessageComponent } from '../message/message.component';
import { AttachmentsComponent } from '../attachments/attachments.component';
import { AttachmentThumbnailComponent } from '../attachment-thumbnail/attachment-thumbnail.component';
import { ImageModalComponent } from '../image-modal/image-modal.component';

describe('item-mini-view-component', () => {
  let component: ItemMiniViewComponent;
	let fixture: ComponentFixture<ItemMiniViewComponent>;
	
	class AttachmentServiceMock {
		get(fileHref: string): Promise<FilePojo[]> {
			const file = new FilePojo();
			file._href = 'myHref';
			file.contentType = 'myContentType';
			file.fileId = 1;
			file.name = 'myName';
			file.originalUrl = 'myOriginalUrl';
			file.thumbnailUrl = 'myThumbnailUrl';
			const result: FilePojo[] = [];
			result.push(file);
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
