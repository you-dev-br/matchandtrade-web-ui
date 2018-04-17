import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationCallbackComponent } from './components/authentication-callback/authentication-callback.component'
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemComponent } from './components/item/item.component';
import { ItemMatcherListComponent } from './components/item-matcher-list/item-matcher-list.component';
import { ItemMatcherOfferComponent } from './components/item-matcher-offer/item-matcher-offer.component';
import { LoggedInGuard } from './classes/permission/logged-in.guard';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TradeComponent } from './components/trade/trade.component';
import { TradeListComponent } from './components/trade-list/trade-list.component';
import { TradeResultComponent } from './components/trade-result/trade-result.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

const routes: Routes = [
  { path: 'home', component: WelcomeComponent },
  { path: 'authenticate-callback', component: AuthenticationCallbackComponent }, 
  { path: 'item-matcher-list', component: ItemMatcherListComponent },
  { path: 'item-matcher-offer', component: ItemMatcherOfferComponent },
  { path: 'item-list', component: ItemListComponent },
  { path: 'items', component: ItemComponent },
  { path: 'my-account', component: MyAccountComponent },
  { path: 'trade-list', component: TradeListComponent },
  { path: 'trade-result', component: TradeResultComponent },
  { path: 'trades', component: TradeComponent, canActivate: [ LoggedInGuard ] },
  { path: 'sign-in', component: SignInComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoggedInGuard]
})
export class AppRoutingModule { }
