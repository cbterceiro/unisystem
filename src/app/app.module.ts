import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import 'rxjs/Rx';

import { ConfirmationService, DomHandler } from 'primeng/primeng';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core';
import { AuthenticationModule } from './authentication';
import { LayoutModule } from './layout';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,

    AppRoutingModule,

    CoreModule,
    AuthenticationModule,
    LayoutModule,
    SharedModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ConfirmationService,
    DomHandler,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
