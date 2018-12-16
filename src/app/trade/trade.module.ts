import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { MaterialDesignModule } from '../config/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { TradeRoutingModule } from './trade-routing.module';
import { AppCommonModule } from '../common/common.module';

@NgModule({
	declarations: [EntryComponent, ListComponent],
  imports: [
		MaterialDesignModule,
		CommonModule,
		ReactiveFormsModule,
		TradeRoutingModule,
		AppCommonModule,
	]
})
export class TradeModule { }
