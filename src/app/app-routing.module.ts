import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationCallbackComponent } from './components/authentication-callback/authentication-callback.component'
import { LoggedInGuard } from './classes/permission/logged-in.guard';
import { ItemListComponent } from './components/item-list/item-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TradeComponent } from './components/trade/trade.component';
import { TradeListComponent } from './components/trade-list/trade-list.component';

const routes: Routes = [
  { path: 'authenticate/callback', component: AuthenticationCallbackComponent },
  { path: 'item-list', component: ItemListComponent },
  { path: 'trade-list', component: TradeListComponent },
  { path: 'trades',
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
