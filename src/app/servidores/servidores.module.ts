import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ServidoresRoutingModule } from './servidores-routing.module';
import { ServidoresComponent } from './servidores.component';

@NgModule({
  imports: [
    SharedModule,
    ServidoresRoutingModule,
  ],
  declarations: [
    ServidoresComponent,
  ],
  providers: [
  ],
})
export class ServidoresModule { }
