import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    SharedModule,
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
