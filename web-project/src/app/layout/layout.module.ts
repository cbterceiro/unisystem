import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main.component';
import { TopbarComponent } from './topbar.component';
import { LeftpanelComponent } from './leftpanel.component';
import { RightpanelComponent } from './rightpanel.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports: [],
  declarations: [
    MainComponent,
    TopbarComponent,
    LeftpanelComponent,
    RightpanelComponent,
    DashboardComponent,
  ],
  providers: [],
})
export class LayoutModule {

}
