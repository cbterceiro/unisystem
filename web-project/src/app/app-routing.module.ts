import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent, AuthenticationGuard } from './authentication';
import { MainComponent, DashboardComponent } from './layout';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, canActivateChild: [AuthenticationGuard], children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule' },
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
