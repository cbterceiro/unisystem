import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { /*LoginComponent,*/ AuthenticationGuard } from './authentication';
import { SelectServidorComponent } from './authentication/select-servidor.component';
import { MainComponent, DashboardComponent } from './layout';



const routes: Routes = [
  //{ path: 'login', component: LoginComponent },
  { path: 'login', component: SelectServidorComponent },
  {
    // Fixa as rotas possiveis do app.
    path: '', component: MainComponent, canActivateChild: [AuthenticationGuard], children: [
      { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule' },
      { path: 'servidores', loadChildren: 'app/servidores/servidores.module#ServidoresModule' },
      { path: 'noticias', loadChildren: 'app/cadastro-noticias/cadastro-noticias.module#CadastroNoticiasModule' },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ]
  },
  // Página 404
  //{ path: '**', pathMatch: 'full', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
