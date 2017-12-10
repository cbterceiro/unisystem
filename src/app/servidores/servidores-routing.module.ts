import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServidoresComponent } from './servidores.component';
import { ServidorDetalheComponent } from './servidor-detalhe.component';

const routes: Routes = [
  {
    path: '', component: ServidoresComponent,
  },
  {
    path: ':id/detalhe', component: ServidorDetalheComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServidoresRoutingModule { }
