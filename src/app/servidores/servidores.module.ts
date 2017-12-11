import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ServidoresRoutingModule } from './servidores-routing.module';
import { ServidoresComponent } from './servidores.component';
import { ServidorDetalheComponent } from './servidor-detalhe.component';


@NgModule({
  imports: [
    SharedModule,
    ServidoresRoutingModule,
  ],
  declarations: [
    ServidoresComponent,
    ServidorDetalheComponent
  ],
  providers: [
  ],
})
export class ServidoresModule { }
