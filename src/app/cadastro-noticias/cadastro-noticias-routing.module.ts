import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroNoticiasComponent } from './cadastro-noticias.component';

const routes: Routes = [
  { path: '', component: CadastroNoticiasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroNoticiasRoutingModule { }