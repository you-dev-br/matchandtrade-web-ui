import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EntryComponent } from './entry/entry.component';

const routes: Routes = [
	{ path: '', component: ListComponent },
  { path: 'entries', component: EntryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradeRoutingModule { }
