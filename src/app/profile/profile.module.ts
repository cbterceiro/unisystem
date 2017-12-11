import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

import { FormacaoAcademicaComponent } from './formacao-academica/formacao-academica.component';
import { FormacaoAcademicaModalComponent } from './formacao-academica/formacao-academica-modal.component';
import { FormacaoAcademicaService } from './formacao-academica/formacao-academica.service';

import { CargoComponent } from './cargo/cargo.component';
import { CargoModalComponent } from './cargo/cargo-modal.component';

import { FuncaoComponent } from './funcao/funcao.component';
import { FuncaoModalComponent } from './funcao/funcao-modal.component';

import { CargoService } from './cargo/cargo.service';
import { FuncaoService } from './funcao/funcao.service';

import { CapacitacaoComponent } from './capacitacao/capacitacao.component';
import { CapacitacaoModalComponent } from './capacitacao/capacitacao-modal.component';
import { CapacitacaoService } from './capacitacao/capacitacao.service';

import { CertificacaoComponent } from './certificacao/certificacao.component';
import { CertificacaoModalComponent } from './certificacao/certificacao-modal.component';
import { CertificacaoService } from './certificacao/certificacao.service';

import { HabilidadeComponent } from './habilidade/habilidade.component';
import { HabilidadeService } from './habilidade/habilidade.service';

import { PublicacaoComponent } from './publicacao/publicacao.component';
import { PublicacaoModalComponent } from './publicacao/publicacao-modal.component';
import { PublicacaoService } from './publicacao/publicacao.service';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    CargoComponent,
    CargoModalComponent,
    FuncaoComponent,
    FuncaoModalComponent,
    FormacaoAcademicaComponent,
    FormacaoAcademicaModalComponent,
    CapacitacaoComponent,
    CapacitacaoModalComponent,
    CertificacaoComponent,
    CertificacaoModalComponent,
    HabilidadeComponent,
    PublicacaoComponent,
    PublicacaoModalComponent,
  ],
  providers: [
    CapacitacaoService,
    CertificacaoService,
    FormacaoAcademicaService,
    CargoService,
    FuncaoService,
    HabilidadeService,
    PublicacaoService,
  ],
})
export class ProfileModule { }

