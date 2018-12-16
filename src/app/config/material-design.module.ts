import { NgModule } from '@angular/core';

import {
	MatButtonModule, 
	MatCardModule,
	MatCheckboxModule,
	MatIconModule,
	MatInputModule,
	MatFormFieldModule,
	MatMenuModule,
	MatPaginatorModule,
	MatRadioModule,
	MatSelectModule,
	MatTableModule,
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
		MatPaginatorModule,
		MatRadioModule,
		MatSelectModule,
		MatTableModule,
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
		MatPaginatorModule,
		MatRadioModule,
		MatSelectModule,
		MatTableModule,
		MatToolbarModule,
	],
})
export class MaterialDesignModule { }
