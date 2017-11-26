"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var search_model_1 = require("../models/search.model");
var servidor_model_1 = require("../models/servidor.model");
var ServidorService = (function () {
    function ServidorService(httpClientService, fileUploadService) {
        this.httpClientService = httpClientService;
        this.fileUploadService = fileUploadService;
    }
    ServidorService.prototype.getAll = function () {
        var _this = this;
        return this.httpClientService.search('/servidores', new search_model_1.SearchModel({
            fields: ['id', 'nome', 'dataNascimento', 'sexo', 'estadoCivil', 'numeroFuncional', 'estado', 'cidade', 'nacionalidade', 'email', 'foto'],
            orderBy: ['nome asc']
        })).map(function (res) { return _this.jsonToServidores(res.json() || []); });
    };
    ServidorService.prototype.getByPesquisa = function (nome, instituicao, cargo, funcao, orgao, setor, limite, offset) {
        var _this = this;
        return this.httpClientService.search('/servidores', new search_model_1.SearchModel({
            // fields: ['numeroFuncional', 'funcao.nome', 'funcao.orgao', 'habilidade.nome', 'funcao.dataInicio', 'cargo.nome', 'cargo.dataInicio', 'nome', 'id', 'sexo', 'estadoCivil', 'estado', 'cidade', 'email', 'foto'],
            fields: ['numeroFuncional', 'funcao.nome', 'habilidade.nome', 'funcao.dataInicio', 'cargo.nome', 'cargo.dataInicio', 'nome', 'id', 'sexo', 'estadoCivil', 'estado', 'cidade', 'email', 'foto'],
            limit: limite,
            offset: offset,
            filters: ['nome like %' + nome + '%', (orgao.length > 0 ? 'funcao.orgao.nome like %' + orgao + '%' : ''), (cargo.length > 0 ? 'cargo.nome like %' + cargo + '%' : ''), (funcao.length > 0 ? 'funcao.nome like %' + funcao + '%' : ''), (setor.length > 0 ? 'cargo.setor like %' + setor + '%' : '')],
            orderBy: ['nome asc, cargo.dataInicio desc, funcao.dataInicio desc']
        })).map(function (res) { return _this.jsonToServidores(res.json() || []); });
    };
    ServidorService.prototype.getByPesquisa2 = function (nome, instituicao, cargo, orgao, setor, limite, offset) {
        var _this = this;
        return this.httpClientService.get('/servidores2?nome=' + nome + '&instituicao=' + instituicao + '&cargo=' + cargo + '&orgao=' + orgao + '&setor=' + setor)
            .map(function (res) { return _this.jsonToServidores(res.json() || []); });
    };
    ServidorService.prototype.getById = function (id) {
        var _this = this;
        return this.httpClientService.get("/servidores/" + id)
            .map(function (res) { return _this.jsonToServidor(res.json() || {}); });
    };
    ServidorService.prototype["delete"] = function (id) {
        return this.httpClientService["delete"]("/servidores/" + id)
            .map(function (res) { return res.json() || {}; });
    };
    ServidorService.prototype.save = function (servidor) {
        var s = Object.assign({}, servidor);
        delete s.foto;
        return s.id ? this.update(s) : this.create(s);
    };
    ServidorService.prototype.updateImg = function (id, file) {
        return this.fileUploadService.uploadFile("/servidores/" + id + "/foto", 'foto', file)
            .map(function (res) { return res.json() || {}; });
    };
    ServidorService.prototype.create = function (servidor) {
        return this.httpClientService.post('/servidores', servidor)
            .map(function (res) { return res.json(); });
    };
    ServidorService.prototype.update = function (servidor) {
        return this.httpClientService.put("/servidores/" + servidor.id, servidor)
            .map(function (res) { return res.json(); });
    };
    ServidorService.prototype.jsonToServidor = function (json) {
        var servidor = Object.assign(new servidor_model_1.Servidor(), json);
        if (json.dataNascimento) {
            servidor.dataNascimento = new Date(json.dataNascimento);
        }
        delete servidor['created_at'];
        delete servidor['updated_at'];
        return servidor;
    };
    ServidorService.prototype.jsonToServidores = function (json) {
        var _this = this;
        return json.map(function (obj) { return _this.jsonToServidor(obj); });
    };
    return ServidorService;
}());
ServidorService = __decorate([
    core_1.Injectable()
], ServidorService);
exports.ServidorService = ServidorService;
