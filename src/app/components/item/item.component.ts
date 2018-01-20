import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  itemFormGroup: FormGroup;
  loading: boolean = false;
  nameFormControl: AbstractControl;
  tradeMembershipHref: string;

  constructor(
    private route: ActivatedRoute,
    formBuilder: FormBuilder
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
    // this.loading = true;
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
