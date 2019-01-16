import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialDesignModule } from '../config/material-design.module';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [WelcomeComponent, MenuComponent],
  exports: [MenuComponent],
  imports: [
    MaterialDesignModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
