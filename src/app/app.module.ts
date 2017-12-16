import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TradesComponent } from './components/trades/trades.component';
import { TradeListComponent } from './components/trades/trade-list/trade-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    TradesComponent,
    SignInComponent,
    TradeListComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
