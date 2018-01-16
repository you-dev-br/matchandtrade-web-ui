import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TradeListComponent } from './components/trades/trade-list/trade-list.component';
import { TradeComponent } from './components/trades/trade/trade.component';
import { AuthenticationCallbackComponent } from './components/authentication-callback/authentication-callback.component';
import { AuthenticationService } from './services/authentication.service';
import { LoadingComponent } from './components/loading/loading.component';
import { HttpService } from './services/http.service';
import { MessageComponent } from './components/message/message.component';
import { UserService } from './services/user.service';
import { ItemHubComponent } from './components/item-hub/item-hub.component';
import { ItemListComponent } from './components/item-list/item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SignInComponent,
    TradeListComponent,
    PaginationComponent,
    TradeComponent,
    AuthenticationCallbackComponent,
    LoadingComponent,
    MessageComponent,
    ItemHubComponent,
    ItemListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule, // Refrain of using FormsModule and favor ReactiveFormModule which is more explicit and powerful than FormsModule.
    HttpModule
  ],
  providers: [AuthenticationService, HttpService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
