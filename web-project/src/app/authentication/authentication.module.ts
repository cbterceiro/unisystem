import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { AuthenticationService } from './authentication.service';
import { AuthenticationGuard } from './authentication.guard';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
  ],
})
export class AuthenticationModule {

}
