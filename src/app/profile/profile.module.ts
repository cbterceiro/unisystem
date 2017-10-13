import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileModalComponent } from './profile-modal.component';

import { FormacaoAcademicaComponent } from './formacao-academica/formacao-academica.component';
import { FormacaoAcademicaModalComponent } from './formacao-academica/formacao-academica-modal.component';
import { FormacaoAcademicaService } from './formacao-academica/formacao-academica.service';

import { CargoComponent } from './cargo/cargo.component';
import { CargoModalComponent } from './cargo/cargo-modal.component';

import { FuncaoComponent } from './funcao/funcao.component';
import { FuncaoModalComponent } from './funcao/funcao-modal.component';

import { ServidorService } from './servidor.service';
import { CargoService } from './cargo/cargo.service';
import { FuncaoService } from './funcao/funcao.service';

import { CapacitacaoComponent } from './capacitacao/capacitacao.component';
import { CapacitacaoModalComponent } from './capacitacao/capacitacao-modal.component';
import { CapacitacaoService } from './capacitacao/capacitacao.service';

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
    FuncaoComponent,
    FuncaoModalComponent,
    FormacaoAcademicaComponent,
    FormacaoAcademicaModalComponent,
    CapacitacaoComponent,
    CapacitacaoModalComponent,
  ],
  providers: [
    CapacitacaoService,
    ServidorService,
    FormacaoAcademicaService,
    CargoService,
    FuncaoService,
  ],
})
export class ProfileModule { }

