import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TradesComponent } from './components/trades/trades.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

const routes: Routes = [
  { path: 'trades', component: TradesComponent },
  { path: 'sign-in', component: SignInComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
