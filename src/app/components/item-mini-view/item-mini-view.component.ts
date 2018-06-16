import { Component, OnInit, Input } from '@angular/core';
import { FileService } from '../../services/file.service';
import { Attachment, AttachmentStatus } from '../../classes/pojo/attachment';
import { FileTransformer } from '../../classes/transformers/file-transformer';
import { AttachmentTransformer } from '../../classes/transformers/attachment-transformer';
import { Item } from '../../classes/pojo/item';
import { ItemService } from '../../services/item.service';
import { ItemHelper } from '../../../../e2e/items/item-helper';
import { Message } from '../message/message';

@Component({
  selector: 'app-item-mini-view',
  templateUrl: './item-mini-view.component.html',
	styleUrls: ['./item-mini-view.component.scss'],
	providers: [ItemService, FileService]
})
export class ItemMiniViewComponent implements OnInit {

	attachments: Attachment[] = [];
	item: Item;
	@Input() itemHref: string;
	loading: boolean = true;
	message: Message = new Message();
	
	private attachmentTransformer: AttachmentTransformer = new AttachmentTransformer();
	
	constructor(private itemService: ItemService, private fileService: FileService) {
		
	}

  ngOnInit() {
		this.itemService.get(this.itemHref).then(item => {
			this.item = item;
			return item.getFilesHref();
		})
		.then(filesHref => this.fileService.get(filesHref))
		.then(file => {
			this.attachmentTransformer.toPojos(file).forEach(a => {
				a.status = AttachmentStatus.STORED;
				this.attachments.push(a);
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
