import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeEntryComponent } from './entry/trade-entry.component';
import { MaterialDesignModule } from '../config/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TradeListComponent } from './list/trade-list.component';
import { TradeRoutingModule } from './trade-routing.module';
import { AppCommonModule } from '../common/common.module';

@NgModule({
  declarations: [TradeEntryComponent, TradeListComponent],
  imports: [
    MaterialDesignModule,
    CommonModule,
    ReactiveFormsModule,
    TradeRoutingModule,
    AppCommonModule,
  ]
})
export class TradeModule { }
