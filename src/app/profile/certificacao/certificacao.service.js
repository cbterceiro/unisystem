"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var core_2 = require("../../core");
var CertificacaoService = (function () {
    function CertificacaoService(httpClientService) {
        this.httpClientService = httpClientService;
    }
    CertificacaoService.prototype.getAll = function (id) {
        return this.httpClientService.get("/servidores/" + id + "/certificacoes")
            .map(function (res) { return res.json() || []; });
    };
    CertificacaoService.prototype.getById = function (id) {
        return this.httpClientService.get("/certificacoes/" + id)
            .map(function (res) { return res.json() || {}; });
    };
    CertificacaoService.prototype["delete"] = function (id) {
        return this.httpClientService["delete"]("/certificacoes/" + id)
            .map(function (res) { return res.json() || {}; });
    };
    CertificacaoService.prototype.save = function (certificacao) {
        return certificacao.id ? this.update(certificacao) : this.create(certificacao);
    };
    CertificacaoService.prototype.create = function (certificacao) {
        return this.httpClientService.post('/certificacoes', certificacao)
            .map(function (res) { return res.json(); });
    };
    CertificacaoService.prototype.update = function (certificacao) {
        return this.httpClientService.put("/certificacoes/" + certificacao.id, certificacao)
            .map(function (res) { return res.json(); });
    };
    CertificacaoService.prototype.searchEntidades = function (entidade) {
        return this.httpClientService.search("/certificacoes/pesquisa", new core_2.SearchModel({
            fields: ['entidade'],
            filters: ["entidade like %" + entidade + "%"]
        })).map(function (res) { return (res.json() || []).map(function (c) { return c.entidade; }); });
    };
    return CertificacaoService;
}());
CertificacaoService = __decorate([
    core_1.Injectable()
], CertificacaoService);
exports.CertificacaoService = CertificacaoService;
