import { Component, OnInit, Input } from '@angular/core';
import { AttachmentService } from '../../services/attachment.service';
import { Attachment, AttachmentStatus } from '../../classes/pojo/attachment';
import { Item } from '../../classes/pojo/item';
import { ItemService } from '../../services/item.service';
import { Message } from '../message/message';
import { AttachmentTransformer } from '../../classes/transformers/attachment-transformer';

@Component({
  selector: 'app-item-mini-view',
  templateUrl: './item-mini-view.component.html',
	styleUrls: ['./item-mini-view.component.scss'],
	providers: [ItemService, AttachmentService]
})
export class ItemMiniViewComponent implements OnInit {

	attachments: Attachment[] = [];
	item: Item;
	@Input() itemHref: string;
	loading: boolean = true;
	message: Message = new Message();
	
	private attachmentTransformer: AttachmentTransformer = new AttachmentTransformer();
	
	constructor(private itemService: ItemService, private attachmentService: AttachmentService) {
	}

  ngOnInit() {
		this.itemService.get(this.itemHref).then(item => {
			this.item = item;
			return item.getAttachmentsHref();
		})
		.then(attachmentHref => this.attachmentService.get(attachmentHref))
		.then(attachment => {
      attachment.forEach(v => {
        v.status = AttachmentStatus.STORED;
        this.attachments.push(v);
      });
		})
		.then(() => this.loading = false)
		.catch(e => this.message.setErrorItems(e));
  }

  displayInfo(): boolean {
    if (!this.item.description && this.attachments.length == 0) {
      return false
    }
    return true;
  }

}
