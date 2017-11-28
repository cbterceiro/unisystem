"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var formacao_academica_model_1 = require("./formacao-academica.model");
var FormacaoAcademicaService = (function () {
    function FormacaoAcademicaService(httpClientService) {
        this.httpClientService = httpClientService;
    }
    FormacaoAcademicaService.prototype.getAll = function (id) {
        var _this = this;
        return this.httpClientService.get("/servidores/" + id + "/formacaoacademica")
            .map(function (res) { return _this.jsonToFormacoesAcademicas(res.json() || []); });
    };
    FormacaoAcademicaService.prototype.getById = function (id) {
        return this.httpClientService.get("/formacaoacademica/" + id)
            .map(function (res) { return res.json() || {}; });
    };
    FormacaoAcademicaService.prototype.searchInstituicao = function (nome) {
        return this.httpClientService.get("/instituicoes-academicas/nome/" + nome)
            .map(function (res) { return res.json() || {}; });
    };
    // pesquisar cursos para exibir no autocomplete
    FormacaoAcademicaService.prototype.searchCurso = function (nome) {
        return this.httpClientService.get("/cursos?fields=nome&limit=10&offset=0&filter=nome like %" + nome + "%&order=nome asc") // confirmar
            .map(function (res) { return (res.json() || {}).map(function (c) { return c.nome; }); });
    };
    FormacaoAcademicaService.prototype["delete"] = function (id) {
        return this.httpClientService["delete"]("/formacaoacademica/" + id)
            .map(function (res) { return res.json() || {}; });
    };
    FormacaoAcademicaService.prototype.save = function (formacaoAcademica) {
        return formacaoAcademica.id ? this.update(formacaoAcademica) : this.create(formacaoAcademica);
    };
    FormacaoAcademicaService.prototype.create = function (formacaoacademica) {
        return this.httpClientService.post('/formacaoacademica', formacaoacademica)
            .map(function (res) { return res.json(); });
    };
    FormacaoAcademicaService.prototype.update = function (formacaoacademica) {
        return this.httpClientService.put("/formacaoacademica/" + formacaoacademica.id, formacaoacademica)
            .map(function (res) { return res.json(); });
    };
    FormacaoAcademicaService.prototype.jsonToFormacaoAcademica = function (json) {
        var formacaoAcademica = Object.assign(new formacao_academica_model_1.FormacaoAcademica(), json);
        if (json.dataInicio) {
            formacaoAcademica.dataInicio = new Date(json.dataInicio);
        }
        if (json.dataFim) {
            formacaoAcademica.dataFim = new Date(json.dataFim);
        }
        delete formacaoAcademica['created_at'];
        delete formacaoAcademica['updated_at'];
        return formacaoAcademica;
    };
    FormacaoAcademicaService.prototype.jsonToFormacoesAcademicas = function (json) {
        var _this = this;
        return json.map(function (fa) { return _this.jsonToFormacaoAcademica(fa); });
    };
    return FormacaoAcademicaService;
}());
FormacaoAcademicaService = __decorate([
    core_1.Injectable()
], FormacaoAcademicaService);
exports.FormacaoAcademicaService = FormacaoAcademicaService;
