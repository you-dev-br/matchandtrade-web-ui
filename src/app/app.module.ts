import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { TradesComponent } from './components/trades/trades.component';
import { SignInComponent } from './components/sign-in/sign-in.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    TradesComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
