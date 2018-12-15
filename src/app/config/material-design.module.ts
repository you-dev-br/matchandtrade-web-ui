import { NgModule } from '@angular/core';

import {
	MatButtonModule, 
	MatCardModule,
	MatCheckboxModule,
	MatIconModule,
	MatInputModule,
	MatFormFieldModule,
	MatMenuModule,
	MatRadioModule,
	MatSelectModule,
	MatToolbarModule,
} from '@angular/material';

@NgModule({
	declarations: [],
  imports: [
		MatButtonModule, 
		MatCardModule,
		MatCheckboxModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatMenuModule, 
		MatRadioModule,
		MatSelectModule,
		MatToolbarModule,
	],
	exports: [
		MatButtonModule, 
		MatCardModule,
		MatCheckboxModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatMenuModule, 
		MatRadioModule,
		MatSelectModule,
		MatToolbarModule,
	],
})
export class MaterialDesignModule { }
