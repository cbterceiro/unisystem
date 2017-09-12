import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, AuthenticationGuard } from './authentication';
import { MainComponent, DashboardComponent } from './layout';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, canActivateChild: [AuthenticationGuard], children: [
      { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule' },
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
