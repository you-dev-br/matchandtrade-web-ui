import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO: Lazy loading
const routes: Routes = [
  { path: 'trades', loadChildren: '../trade/trade.module#TradeModule' },
  { path: '', loadChildren: '../home/home.module#HomeModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }