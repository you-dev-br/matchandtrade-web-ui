import { NgModule } from '@angular/core';

import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
		MatButtonModule, 
		MatCheckboxModule, 
		MatToolbarModule,
	],
	exports: [
		MatButtonModule,
		MatCheckboxModule,
		MatToolbarModule
	],
})
export class MaterialDesignModule { }
