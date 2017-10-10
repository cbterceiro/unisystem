import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { PrimeNgModule } from './primeng/primeng.module';

import { CalendarBRLocaleDirective } from './calendar-br-locale.directive';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    CalendarBRLocaleDirective,
    SpinnerComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    Angular2FontawesomeModule,
    CalendarBRLocaleDirective,
    SpinnerComponent,
  ]
  //providers: [ NÃO CRIE PROVIDERS AQUI ]

  // O módulo com recursos compartilhados não deve prover nenhum serviço para injeção. Este módulo tem como propósito
  // agrupar os pipes, diretivas e afins de todo o sistema, além de re-exportar módulos comumente usados como
  // CommonModule e FormsModule, por exemplo.
  // Para mais informações: https://angular.io/guide/ngmodule-faq#why-is-it-bad-if-sharedmodule-provides-a-service-to-a-lazy-loaded-module
})
export class SharedModule { }
