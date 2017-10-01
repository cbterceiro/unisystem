import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileModalComponent } from './profile-modal.component';

import { FormacaoAcademicaComponent } from './formacao-academica/formacao-academica.component';
import { FormacaoAcademicaModalComponent } from './formacao-academica/formacao-academica-modal.component';


import { CargoComponent } from './cargo/cargo.component';
import { CargoModalComponent } from './cargo/cargo-modal.component';

import { ServidorService } from './servidor.service';
import { CargoService } from './cargo/cargo.service';

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
    FormacaoAcademicaModalComponent,
  ],
  providers: [
    ServidorService,
    CargoService,
  ],
})
export class ProfileModule { }

