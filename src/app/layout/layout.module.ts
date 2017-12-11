import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImageCropperModule } from 'ng2-img-cropper';

import { SharedModule } from '../shared/shared.module';

import { MainComponent } from './main.component';
import { TopbarComponent } from './topbar/topbar.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { LeftPanelProfileComponent } from './left-panel/left-panel-profile.component';
import { RightPanelComponent } from './right-panel/right-panel.component';

import { ProfileModalComponent } from './left-panel/profile-modal/profile-modal.component';

@NgModule({
  imports: [
    ImageCropperModule,
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
    ProfileModalComponent,
  ],
  providers: [],
})
export class LayoutModule {

}
