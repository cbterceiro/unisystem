"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular2_fontawesome_1 = require("angular2-fontawesome/angular2-fontawesome");
var primeng_module_1 = require("./primeng/primeng.module");
var calendar_default_config_directive_1 = require("./calendar-default-config.directive");
var spinner_component_1 = require("./spinner.component");
var action_icon_component_1 = require("./action-icon.component");
var safe_html_pipe_1 = require("./safe-html.pipe");
var safe_url_pipe_1 = require("./safe-url.pipe");
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            angular2_fontawesome_1.Angular2FontawesomeModule,
        ],
        declarations: [
            calendar_default_config_directive_1.CalendarDefaultConfigDirective,
            spinner_component_1.SpinnerComponent,
            action_icon_component_1.ActionIconComponent,
            safe_html_pipe_1.SafeHtmlPipe,
            safe_url_pipe_1.SafeUrlPipe,
        ],
        exports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            primeng_module_1.PrimeNgModule,
            angular2_fontawesome_1.Angular2FontawesomeModule,
            calendar_default_config_directive_1.CalendarDefaultConfigDirective,
            spinner_component_1.SpinnerComponent,
            action_icon_component_1.ActionIconComponent,
            safe_html_pipe_1.SafeHtmlPipe,
            safe_url_pipe_1.SafeUrlPipe,
        ]
        // providers: [ NÃO CRIE PROVIDERS AQUI ]
        // O módulo com recursos compartilhados não deve prover nenhum serviço para injeção. Este módulo tem como propósito
        // agrupar os pipes, diretivas e afins de todo o sistema, além de re-exportar módulos comumente usados como
        // CommonModule e FormsModule, por exemplo.
        // Para mais informações: https://angular.io/guide/ngmodule-faq#why-is-it-bad-if-sharedmodule-provides-a-service-to-a-lazy-loaded-module
    })
], SharedModule);
exports.SharedModule = SharedModule;
