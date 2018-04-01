import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthenticationCallbackComponent } from './components/authentication-callback/authentication-callback.component';
import { AuthenticationService } from './services/authentication.service';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemComponent } from './components/item/item.component';
import { HttpService } from './services/http.service';
import { LoadingComponent } from './components/loading/loading.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MessageComponent } from './components/message/message.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TradeComponent } from './components/trade/trade.component';
import { TradeListComponent } from './components/trade-list/trade-list.component';
import { UserService } from './services/user.service';
import { ItemMatcherListComponent } from './components/item-matcher-list/item-matcher-list.component';
import { ItemMatcherOfferComponent } from './components/item-matcher-offer/item-matcher-offer.component';
import { NavigationService } from './services/navigation.service';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PageTitleComponent } from './components/page-title/page-title.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationCallbackComponent,
    ItemComponent,
    ItemListComponent,
    ItemMatcherListComponent,
    LoadingComponent,
    NavigationBarComponent,
    MessageComponent,
    PaginationComponent,
    SignInComponent,
    TradeComponent,
    TradeListComponent,
    ItemMatcherOfferComponent,
    WelcomeComponent,
    PageTitleComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule, // Refrain of using FormsModule and favor ReactiveFormModule which is more explicit and powerful than FormsModule.
    HttpModule
  ],
  providers: [AuthenticationService, HttpService, NavigationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
