import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TradesComponent } from './components/trades/trades.component';
import { TradeListComponent } from './components/trades/trade-list/trade-list.component';
import { TradeComponent } from './components/trades/trade/trade.component';
import { AuthenticationCallbackComponent } from './components/authentication-callback/authentication-callback.component';
import { AuthenticationService } from './services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    TradesComponent,
    SignInComponent,
    TradeListComponent,
    PaginationComponent,
    TradeComponent,
    AuthenticationCallbackComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
