import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    HomeRoutingModule
  ]
})
export class HomeModule { }
