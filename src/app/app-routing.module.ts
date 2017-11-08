import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { /*LoginComponent,*/ AuthenticationGuard } from './authentication';
import { SelectServidorComponent } from './authentication/select-servidor.component';
import { MainComponent } from './layout';


const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  { path: 'login', component: SelectServidorComponent },
  {
    path: '', component: MainComponent, canActivateChild: [AuthenticationGuard], children: [
      { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule' },
      { path: 'servidores', loadChildren: 'app/servidores/servidores.module#ServidoresModule' },
      { path: 'noticias', loadChildren: 'app/noticias/noticias.module#NoticiasModule' },
      { path: '', redirectTo: 'noticias', pathMatch: 'full' },
    ]
  },
  // Página 404
  // { path: '**', pathMatch: 'full', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
