import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Item } from '../../classes/pojo/item';
import { ItemService } from '../../services/item.service';
import { Message } from '../message/message';
import { NavigationService } from '../../services/navigation.service';
import { NotFoundException } from '../../classes/exceptions/service-exceptions';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ ItemService ]
})
export class ItemComponent implements OnInit {
  item: Item = new Item();
  itemFormGroup: FormGroup;
	itemHref: string;
  loading: boolean = true;
  nameFormControl: AbstractControl;
  message: Message = new Message();
	tradeMembershipHref: string;

  constructor(
    private route: ActivatedRoute,
    formBuilder: FormBuilder,
    private itemService: ItemService,
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
				})
				.catch(e => {
					if (!(e instanceof NotFoundException)) {
						this.message.setErrorItems(e);
					}
				})
				.then(() => {
					this.populateForm(this.item);
					this.loading = false;
				});
		}

	}
	
  private buildForm(formBuilder: FormBuilder): void {
    this.itemFormGroup = formBuilder.group({
      'name': ['',Validators.compose([Validators.required, this.nameValidator])]
    });
    this.nameFormControl = this.itemFormGroup.controls['name'];
  }

  private nameValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && (control.value.length < 3 || control.value.length > 150)) {
      return {invalid: true};
    }
  }

  private populateForm(item: Item) {
    this.nameFormControl.setValue(item.name);
  }

  onSubmit() {
    this.loading = true;
    this.item.name = this.nameFormControl.value;
    this.itemService.save(this.item, this.tradeMembershipHref)
      .then(v => {
        this.item = v;
        this.populateForm(this.item);
        this.itemFormGroup.markAsPristine();
        this.message.setInfoItems('Item saved.');
        this.loading = false;
      })
      .catch(e => {
        this.message.setErrorItems(e);
        this.itemFormGroup.markAsPristine();
        this.loading = false;
      });
  }

}
