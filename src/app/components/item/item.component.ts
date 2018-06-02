import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Item } from '../../classes/pojo/item';
import { ItemService } from '../../services/item.service';
import { Message } from '../message/message';
import { NavigationService } from '../../services/navigation.service';
import { FileUpload, FileUploadStatus } from '../../classes/pojo/file-upload';
import { FileTransformer } from '../../classes/transformers/file-transformer';
import { noUndefined } from '@angular/compiler/src/util';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { FileStorageService } from '../../services/file-storage.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ ItemService, FileStorageService ]
})
export class ItemComponent implements OnInit {
  item: Item = new Item();
  itemFormGroup: FormGroup;
	itemHref: string;
  loading: boolean = true;
  nameFormControl: AbstractControl;
  descriptionFormControl: AbstractControl;
  message: Message = new Message();
	tradeMembershipHref: string;
	fileTransformer = new FileTransformer();
	files: FileUpload[] = [];

  constructor(
    private route: ActivatedRoute,
    formBuilder: FormBuilder,
		private itemService: ItemService,
		private fileStorageService: FileStorageService,
    private navigationService: NavigationService
  ) {
    this.buildForm(formBuilder);
  }

  ngOnInit() {
    this.tradeMembershipHref = this.navigationService.obtainData(this.route).tradeMembershipHref;
    this.itemHref = this.navigationService.obtainData(this.route).itemHref;
		
		if (!this.itemHref) {
			this.loading = false;
		} else {
			this.itemService.get(this.itemHref)
				.then(v => {
					this.item = v;
					return v;
				})
				.then(v => {
					const filesUrl = v._links.find(link => link.rel == 'files');
					return this.fileStorageService.get(filesUrl.href);
				})
				.then(filePojos => {
					filePojos.forEach(filePojo => {
						const fileUpload = this.fileTransformer.toFileUpload(filePojo);
						this.files.push(fileUpload);
					})
				})
				.catch(e => {
					this.message.setErrorItems(e);
				})
				.then(() => {
					this.populateForm(this.item);
					this.loading = false;
				});
		}

	}
	
  private buildForm(formBuilder: FormBuilder): void {
    this.itemFormGroup = formBuilder.group({
      'name': ['',Validators.compose([Validators.required, this.nameValidator])],
      'description': ['', Validators.compose([this.descriptionValidator])]
    });
    this.nameFormControl = this.itemFormGroup.controls['name'];
    this.descriptionFormControl = this.itemFormGroup.controls['description'];
	}
	
	private isUploading(): boolean {
		let result: boolean = false;
		this.files.forEach(v => {
			if (v.status == FileUploadStatus.UPLOADING) {
				result = true;
			}
		});
		return result;
	}

  private nameValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && (control.value.length < 3 || control.value.length > 150)) {
      return {invalid: true};
    }
  }

  private descriptionValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && control.value.length > 500) {
      return {invalid: true};
    }
  }

  private populateForm(item: Item) {
    this.nameFormControl.setValue(item.name);
    this.descriptionFormControl.setValue(item.description);
	}
	
	onFileUploadChange(files: FileUpload[]) {
		this.files = files;
		this.itemFormGroup.markAsDirty();
	}

  onSubmit() {
    this.loading = true;
    this.item.name = this.nameFormControl.value;
    this.item.description = this.descriptionFormControl.value;
    this.itemService.save(this.item, this.tradeMembershipHref)
      .then(v => {
        this.item = v;
				this.populateForm(this.item);
				return v;
			})
			.then(v => {
				const addFilePromisses = new Array<Promise<any>>();
				for (let i=0; i<this.files.length; i++) {
					const addFilePromise = this.itemService.addFile(v._href, this.files[i].fileId);
					addFilePromisses.push(addFilePromise);
				}
				return Promise.all(addFilePromisses);
			})
			.then(v => {
				this.navigationService.setNavigationMessage('Item saved.');
				this.navigateBack();
			})
      .catch(e => {
        this.message.setErrorItems(e);
        this.itemFormGroup.markAsPristine();
        this.loading = false;
      });
  }

  navigateBack() {
    this.navigationService.back();
	}
	
	saveButtonDisabledAttribute(): string {
		if (this.itemFormGroup.valid && this.itemFormGroup.dirty && !this.isUploading()) {
			return null;
		}
		return 'disabled';
	}

}
