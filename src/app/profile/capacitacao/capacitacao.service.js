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
var capacitacao_model_1 = require("./capacitacao.model");
var CapacitacaoService = (function () {
    function CapacitacaoService(httpClientService) {
        this.httpClientService = httpClientService;
    }
    CapacitacaoService.prototype.getAll = function (id) {
        var _this = this;
        return this.httpClientService.get("/servidores/" + id + "/atividades-complementares")
            .map(function (res) { return _this.jsonToCapacitacoes(res.json() || []); });
    };
    CapacitacaoService.prototype.getById = function (id) {
        var _this = this;
        return this.httpClientService.get("/atividades-complementares/" + id)
            .map(function (res) { return _this.jsonToCapacitacao(res.json() || {}); });
    };
    CapacitacaoService.prototype["delete"] = function (id) {
        return this.httpClientService["delete"]("/atividades-complementares/" + id)
            .map(function (res) { return res.json() || {}; });
    };
    CapacitacaoService.prototype.save = function (Capacitacao) {
        return Capacitacao.id ? this.update(Capacitacao) : this.create(Capacitacao);
    };
    CapacitacaoService.prototype.searchEntidades = function (entidade) {
        return this.httpClientService.search("/atividades-complementares/pesquisa", new core_2.SearchModel({
            fields: ['entidade'],
            filters: ["entidade like %" + entidade + "%"]
        })).map(function (res) { return (res.json() || []).map(function (c) { return c.entidade; }); });
    };
    CapacitacaoService.prototype.create = function (Capacitacao) {
        return this.httpClientService.post('/atividades-complementares', Capacitacao)
            .map(function (res) { return res.json(); });
    };
    CapacitacaoService.prototype.update = function (Capacitacao) {
        return this.httpClientService.put("/atividades-complementares/" + Capacitacao.id, Capacitacao)
            .map(function (res) { return res.json(); });
    };
    CapacitacaoService.prototype.jsonToCapacitacao = function (json) {
        var capacitacao = Object.assign(new capacitacao_model_1.Capacitacao(), json);
        if (json.dataInicio) {
            capacitacao.dataInicio = new Date(json.dataInicio);
        }
        if (json.dataFim) {
            capacitacao.dataFim = new Date(json.dataFim);
        }
        delete capacitacao['created_at'];
        delete capacitacao['updated_at'];
        return capacitacao;
    };
    CapacitacaoService.prototype.jsonToCapacitacoes = function (json) {
        var _this = this;
        return json.map(function (obj) { return _this.jsonToCapacitacao(obj); });
    };
    return CapacitacaoService;
}());
CapacitacaoService = __decorate([
    core_1.Injectable()
], CapacitacaoService);
exports.CapacitacaoService = CapacitacaoService;
