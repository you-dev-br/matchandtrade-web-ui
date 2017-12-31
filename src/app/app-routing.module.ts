import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationCallbackComponent } from './components/authentication-callback/authentication-callback.component'
import { TradeComponent } from './components/trades/trade/trade.component';
import { TradesComponent } from './components/trades/trades.component';
import { RouteAction } from './classes/route/route-action';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LoggedInGuard } from './classes/permission/logged-in.guard';


const routes: Routes = [
  { path: 'authenticate/callback', component: AuthenticationCallbackComponent },
  { path: 'trades', component: TradesComponent },
  { path: 'trades/:tradeId',
    component: TradeComponent,
    canActivate: [ LoggedInGuard ],
    data: {
      guardRedirect: 'sign-in'
    }},
  { path: 'trades-create',
    component: TradeComponent,
    canActivate: [ LoggedInGuard ],
    data: {
      guardRedirect: 'sign-in',
      routeAction: RouteAction.CREATE
    }},
  { path: 'sign-in', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoggedInGuard]
})
export class AppRoutingModule { }
