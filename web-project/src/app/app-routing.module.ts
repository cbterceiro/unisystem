import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './authentication';
import { MainComponent, DashboardComponent } from './layout';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, canActivateChild: [/* Guardas de Authentication e Authorization */], children: [
      { path: 'dashboard', component: DashboardComponent },
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
