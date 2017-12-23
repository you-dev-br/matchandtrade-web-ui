import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationCallbackComponent } from './components/authentication-callback/authentication-callback.component'
import { TradeComponent } from './components/trades/trade/trade.component';
import { TradesComponent } from './components/trades/trades.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  { path: 'authenticate/callback', component: AuthenticationCallbackComponent },
  { path: 'trades/:tradeId', component: TradeComponent },
  { path: 'trades', component: TradesComponent },
  { path: 'sign-in', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
