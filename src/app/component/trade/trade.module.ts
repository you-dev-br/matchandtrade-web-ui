import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeListComponent } from './entry/entry.component';
import { MaterialDesignModule } from '../../config/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [TradeListComponent],
  imports: [
		CommonModule,
		ReactiveFormsModule,
		MaterialDesignModule
	],
	exports: [TradeListComponent]
})
export class TradeModule { }
