import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { MaterialDesignModule } from '../config/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { TradeRoutingModule } from './trade-routing.module';

@NgModule({
	declarations: [EntryComponent, ListComponent],
  imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialDesignModule,
		TradeRoutingModule
	]
})
export class TradeModule { }
