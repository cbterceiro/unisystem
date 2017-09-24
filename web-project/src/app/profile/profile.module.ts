import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileModalComponent } from './profile-modal.component';
import { CargoComponent } from './cargo/cargo.component';
import { FormacaoAcademicaComponent } from './formacao-academica/formacao-academica.component';

import { ServidorService } from './servidor.service';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    ProfileModalComponent,
    CargoComponent,
    FormacaoAcademicaComponent,
  ],
  providers: [
    ServidorService,
  ],
})
export class ProfileModule { }
