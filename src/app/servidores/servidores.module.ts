import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ServidoresRoutingModule } from './servidores-routing.module';
import { ServidoresComponent } from './servidores.component';


import { ServidorService } from '../profile/servidor.service';


@NgModule({
  imports: [
    SharedModule,
    ServidoresRoutingModule,
  ],
  declarations: [
    ServidoresComponent,
  ],
  providers: [
    ServidorService,
  ],
})
export class ServidoresModule { }

