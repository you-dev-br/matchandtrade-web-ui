import { NgModule } from '@angular/core';

import {
	MatButtonModule, 
	MatCheckboxModule,
	MatIconModule, 
	MatMenuModule, 
	MatToolbarModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
		MatButtonModule, 
		MatCheckboxModule,
		MatIconModule,
		MatMenuModule, 
		MatToolbarModule,
	],
	exports: [
		MatButtonModule, 
		MatCheckboxModule,
		MatIconModule,
		MatMenuModule, 
		MatToolbarModule,
	],
})
export class MaterialDesignModule { }
