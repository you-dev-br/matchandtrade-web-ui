import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry/entry.component';
import { MaterialDesignModule } from '../../config/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';

@NgModule({
	declarations: [EntryComponent, ListComponent],
  imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialDesignModule
	]
})
export class TradeModule { }
