import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServidoresComponent } from './servidores.component';

const routes: Routes = [
  {
    path: '', component: ServidoresComponent, children: [ ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServidoresRoutingModule { }
