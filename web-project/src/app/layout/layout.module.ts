import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports: [],
  declarations: [
    MainComponent,
    DashboardComponent,
  ],
  providers: [],
})
export class LayoutModule {

}
