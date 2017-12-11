"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared/shared.module");
var profile_routing_module_1 = require("./profile-routing.module");
var profile_component_1 = require("./profile.component");
var formacao_academica_component_1 = require("./formacao-academica/formacao-academica.component");
var formacao_academica_modal_component_1 = require("./formacao-academica/formacao-academica-modal.component");
var formacao_academica_service_1 = require("./formacao-academica/formacao-academica.service");
var cargo_component_1 = require("./cargo/cargo.component");
var cargo_modal_component_1 = require("./cargo/cargo-modal.component");
var funcao_component_1 = require("./funcao/funcao.component");
var funcao_modal_component_1 = require("./funcao/funcao-modal.component");
var cargo_service_1 = require("./cargo/cargo.service");
var funcao_service_1 = require("./funcao/funcao.service");
var capacitacao_component_1 = require("./capacitacao/capacitacao.component");
var capacitacao_modal_component_1 = require("./capacitacao/capacitacao-modal.component");
var capacitacao_service_1 = require("./capacitacao/capacitacao.service");
var certificacao_component_1 = require("./certificacao/certificacao.component");
var certificacao_modal_component_1 = require("./certificacao/certificacao-modal.component");
var certificacao_service_1 = require("./certificacao/certificacao.service");
var habilidade_component_1 = require("./habilidade/habilidade.component");
var habilidade_service_1 = require("./habilidade/habilidade.service");
var publicacao_component_1 = require("./publicacao/publicacao.component");
var publicacao_modal_component_1 = require("./publicacao/publicacao-modal.component");
var publicacao_service_1 = require("./publicacao/publicacao.service");
var ProfileModule = (function () {
    function ProfileModule() {
    }
    return ProfileModule;
}());
ProfileModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            profile_routing_module_1.ProfileRoutingModule,
        ],
        declarations: [
            profile_component_1.ProfileComponent,
            cargo_component_1.CargoComponent,
            cargo_modal_component_1.CargoModalComponent,
            funcao_component_1.FuncaoComponent,
            funcao_modal_component_1.FuncaoModalComponent,
            formacao_academica_component_1.FormacaoAcademicaComponent,
            formacao_academica_modal_component_1.FormacaoAcademicaModalComponent,
            capacitacao_component_1.CapacitacaoComponent,
            capacitacao_modal_component_1.CapacitacaoModalComponent,
            certificacao_component_1.CertificacaoComponent,
            certificacao_modal_component_1.CertificacaoModalComponent,
            habilidade_component_1.HabilidadeComponent,
            publicacao_component_1.PublicacaoComponent,
            publicacao_modal_component_1.PublicacaoModalComponent,
        ],
        providers: [
            capacitacao_service_1.CapacitacaoService,
            certificacao_service_1.CertificacaoService,
            formacao_academica_service_1.FormacaoAcademicaService,
            cargo_service_1.CargoService,
            funcao_service_1.FuncaoService,
            habilidade_service_1.HabilidadeService,
            publicacao_service_1.PublicacaoService,
        ]
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
