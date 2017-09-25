import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileModalComponent } from './profile-modal.component';
import { FormacaoAcademicaComponent } from './formacao-academica/formacao-academica.component';

import { CargoComponent } from './cargo/cargo.component';
import { CargoModalComponent } from './cargo/cargo-modal.component';


@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    ProfileModalComponent,
    CargoComponent,
    CargoModalComponent,
    FormacaoAcademicaComponent,
  ],
})
export class ProfileModule { }
export class CargoModule { }
