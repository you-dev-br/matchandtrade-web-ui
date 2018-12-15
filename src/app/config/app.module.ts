import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing.module';
import { AppComponent } from '../app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './material-design.module';
import { TradeModule } from '../component/trade/trade.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		BrowserAnimationsModule,
		MaterialDesignModule,
		TradeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
