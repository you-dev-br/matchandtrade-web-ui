import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradeListComponent } from './list/trade-list.component';
import { TradeEntryComponent } from './entry/trade-entry.component';

const routes: Routes = [
  { path: '', component: TradeListComponent },
  { path: 'entrie', component: TradeEntryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRoutingModule { }
