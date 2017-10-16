import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';
import { SelectServidorComponent } from './select-servidor.component';
import { AuthenticationService } from './authentication.service';
import { AuthenticationGuard } from './authentication.guard';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [],
  declarations: [
    LoginComponent,
    SelectServidorComponent,
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
  ],
})
export class AuthenticationModule {

}
