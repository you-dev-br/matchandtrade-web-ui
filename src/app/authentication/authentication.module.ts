import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppCommonModule } from '../common/common.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { MaterialDesignModule } from '../config/material-design.module';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [AuthenticateComponent, CallbackComponent],
  imports: [
    CommonModule,
    MaterialDesignModule,
    AppCommonModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
