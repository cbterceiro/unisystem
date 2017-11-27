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
var funcao_model_1 = require("./funcao.model");
var FuncaoService = (function () {
    function FuncaoService(httpClientService) {
        this.httpClientService = httpClientService;
    }
    FuncaoService.prototype.getFuncoesByServidorId = function (id) {
        var _this = this;
        return this.httpClientService.get("/servidores/" + id + "/funcao")
            .map(function (res) { return _this.jsonToFuncoes(res.json() || []); });
    };
    FuncaoService.prototype.searchFuncoes = function (name) {
        return this.httpClientService.search("/funcoes/pesquisa", new core_2.SearchModel({
            fields: ['nome'],
            filters: ["nome like %" + name + "%"]
        })).map(function (res) { return (res.json() || []).map(function (f) { return f.nome; }); });
    };
    FuncaoService.prototype.searchFuncoesCadastradas = function (name) {
        return this.httpClientService.search("/funcoesCadastradas/pesquisa", new core_2.SearchModel({
            fields: ['nome'],
            filters: ["nome like %" + name + "%"]
        })).map(function (res) { return (res.json() || []).map(function (f) { return f.nome; }); });
    };
    FuncaoService.prototype.searchOrgaos = function (name) {
        return this.httpClientService.search("/orgaos", new core_2.SearchModel({
            fields: ['id', 'nome', 'sigla'],
            filters: ["nome like %" + name + "%"]
        })).map(function (res) { return (res.json() || []).map(function (f) { return f; }); });
    };
    FuncaoService.prototype.searchSetores = function (name) {
        return this.httpClientService.search("/setores", new core_2.SearchModel({
            fields: ['id', 'nome'],
            filters: ["nome like %" + name + "%"]
        })).map(function (res) { return (res.json() || []).map(function (f) { return f; }); });
    };
    FuncaoService.prototype.getAllFuncoes = function () {
        return this.httpClientService.get('/funcao')
            .map(function (res) { return res.json() || []; });
    };
    FuncaoService.prototype.save = function (funcao) {
        return funcao.id ? this.update(funcao) : this.create(funcao);
    };
    FuncaoService.prototype.update = function (funcao) {
        return this.httpClientService.put("/funcao/" + funcao.id, funcao)
            .map(function (res) { return res.json(); });
    };
    FuncaoService.prototype.create = function (funcao) {
        return this.httpClientService.post('/funcao', funcao)
            .map(function (res) { return res.json(); });
    };
    FuncaoService.prototype["delete"] = function (id) {
        return this.httpClientService["delete"]("/funcao/" + id)
            .map(function (res) { return res.json() || {}; });
    };
    FuncaoService.prototype.jsonToFuncao = function (json) {
        var funcao = Object.assign(new funcao_model_1.Funcao(), json);
        if (json.dataInicio) {
            funcao.dataInicio = new Date(json.dataInicio);
        }
        if (json.dataFim) {
            funcao.dataFim = new Date(json.dataFim);
        }
        delete funcao['created_at'];
        delete funcao['updated_at'];
        return funcao;
    };
    FuncaoService.prototype.jsonToFuncoes = function (json) {
        var _this = this;
        return json.map(function (obj) { return _this.jsonToFuncao(obj); });
    };
    return FuncaoService;
}());
FuncaoService = __decorate([
    core_1.Injectable()
], FuncaoService);
exports.FuncaoService = FuncaoService;
