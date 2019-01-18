import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO: Lazy loading
const routes: Routes = [
  { path: '', loadChildren: '../home/home.module#HomeModule' },
  { path: 'authentication', loadChildren: '../authentication/authentication.module#AuthenticationModule' },
  { path: 'trade', loadChildren: '../trade/trade.module#TradeModule' },
  { path: 'article', loadChildren: '../article/article.module#ArticleModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: false } // Set true for debugging purposes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }