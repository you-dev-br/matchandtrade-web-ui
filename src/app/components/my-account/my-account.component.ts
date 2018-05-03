import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Message } from '../message/message';
import { NavigationService } from '../../services/navigation.service';
import { User } from '../../classes/pojo/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  providers: [UserService]
})
export class MyAccountComponent implements OnInit {

  loading: boolean = true;
  message: Message = new Message();
  user: User;
  userFormGroup: FormGroup;
  nameFormControl: AbstractControl;

  constructor(
    private formBuilder: FormBuilder,
    private navigationService: NavigationService,
    private userService: UserService
  ) {
    this.buildForm(formBuilder);
  }

  ngOnInit() {
    this.userService.getAuthenticatedUser()
      .then(v => {
        this.setUser(v);})
      .catch(e => {
        this.message.setErrorItems(e);})
      .then(() => {
        this.loading = false;
      });
  }

  private buildForm(formBuilder: FormBuilder): void {
    this.userFormGroup = formBuilder.group({
      'name': ['',Validators.compose([Validators.required, this.nameValidator])],
    });
    this.nameFormControl = this.userFormGroup.controls['name'];
  }

  private nameValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value && (control.value.length < 3 || control.value.length > 150)) {
      return {invalid: true};
    }
  }

  navigateBack(): void {
    this.navigationService.back();
  }

  onUpdateUser(): void {
    this.userService.save(this.user)
      .then(v => this.user = v)
      .catch(e => this.message.setErrorItems(e));
  }

  onSubmit(): void {
    this.loading = true;
    this.user.name = this.nameFormControl.value;
    this.userService.save(this.user)
			.then(v => this.setUser(v))
			.then(() => this.message.setInfoItems('Account saved.'))
      .catch(e => this.message.setErrorItems(e))
      .then(() => {
        this.loading = false;
        this.userFormGroup.markAsPristine();
			});
  }

  private setUser(user: User) {
    this.nameFormControl.setValue(user.name);
    this.user = user;
  }

}
