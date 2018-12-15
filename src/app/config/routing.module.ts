import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent as TradeListComponent } from '../component/trade/list/list.component';
import { EntryComponent as TradeEntryComponent } from '../component/trade/entry/entry.component';

// TODO: Lazy loading
const routes: Routes = [
	{ path: 'trades', component: TradeListComponent },
	{ path: 'trade-entries', component: TradeEntryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }