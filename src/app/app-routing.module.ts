import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationCallbackComponent } from './components/authentication-callback/authentication-callback.component'
import { TradeComponent } from './components/trades/trade/trade.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LoggedInGuard } from './classes/permission/logged-in.guard';
import { ItemListComponent } from './components/item-list/item-list.component';
import { TradeListComponent } from './components/trades/trade-list/trade-list.component';

const routes: Routes = [
  { path: 'authenticate/callback', component: AuthenticationCallbackComponent },
  { path: 'items', component: ItemListComponent },
  { path: 'trades', component: TradeListComponent },
  { path: 'trades/:routeAction',
    component: TradeComponent,
    canActivate: [ LoggedInGuard ],
    data: {
      guardRedirect: 'sign-in'
    }},
  { path: 'sign-in', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoggedInGuard]
})
export class AppRoutingModule { }
