import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Item } from '../../classes/pojo/item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [ ItemService ]
})
export class ItemComponent implements OnInit {

  item: Item = new Item();

  itemFormGroup: FormGroup;
  loading: boolean = false;
  nameFormControl: AbstractControl;
  tradeMembershipHref: string;

  constructor(
    private route: ActivatedRoute,
    formBuilder: FormBuilder,
    private itemService: ItemService
  ) { 
    this.buildForm(formBuilder);
  }

  ngOnInit() {
    this.tradeMembershipHref = this.route.snapshot.paramMap.get('tradeMembershipHref');
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

  onSubmit() {
    this.loading = true;
    this.item.name = this.nameFormControl.value;
    this.itemService.save(this.item, this.tradeMembershipHref)
      .then(v => {
        console.log('onsubmit', v);
      })
      .catch(e => {
        console.log('onsubmit.error', e);
      });

    // this.trade.name = this.nameFormControl.value;
    // this.trade.state = this.stateFormControl.value;
    // this.tradeService.save(this.trade)
    //   .then(v => {
    //     this.trade = v;
    //     this.populateForm(this.trade, null);
    //     this.tradeFormGroup.enable();
    //     this.tradeFormGroup.markAsPristine();
    //     this.message.setInfoItems("Trade saved.");
    //     this.loading = false;
    //     return v;
    //   })
    //   .then(v => {
    //     this.fetchTradeMembership(v).then(membership => {
    //       this.tradeMembership = membership;
    //     })
    //   })
    //   .catch(e => {
    //     this.message.setErrorItems(e);
    //     this.tradeFormGroup.markAsPristine();
    //     this.loading = false;
    //   });
  }


}
