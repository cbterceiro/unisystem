import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main.component';
import { TopbarComponent } from './topbar/topbar.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { LeftPanelProfileComponent } from './left-panel/left-panel-profile.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
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
    LeftPanelComponent,
    LeftPanelProfileComponent,
    RightPanelComponent,
    DashboardComponent,
  ],
  providers: [],
})
export class LayoutModule {

}
