"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
/*import { Setor } from './setor.model';*/
var HabilidadeService = (function () {
    function HabilidadeService(httpClientService) {
        this.httpClientService = httpClientService;
    }
    HabilidadeService.prototype.getAllHabilidadesFromId = function (id) {
        return this.httpClientService.get("/servidores/" + id + "/habilidade")
            .map(function (res) { return res.json() || []; });
    };
    HabilidadeService.prototype.getAllHabilidades = function () {
        return this.httpClientService.get('/habilidade')
            .map(function (res) { return res.json() || []; });
    };
    HabilidadeService.prototype.getAllHabilidadesContains = function (habilidade) {
        //return this.httpClientService.get('/habilidade')
        // .map((res: Response) => res.json() || []);
        return new Observable_1.Observable();
    };
    HabilidadeService.prototype.searchHabilidades = function (nome) {
        return this.httpClientService.get("/habilidade/nome/" + nome)
            .map(function (res) { return res.json().map(function (h) { return h.nome; }) || {}; });
    };
    HabilidadeService.prototype.savehabilidade = function (habilidade) {
        return habilidade.id ? this.updatehabilidade(habilidade) : this.create(habilidade);
    };
    HabilidadeService.prototype.updatehabilidade = function (habilidade) {
        return this.httpClientService.put("/habilidade/" + habilidade.id, habilidade)
            .map(function (res) { return res.json(); });
    };
    HabilidadeService.prototype.recomendarHabilidade = function (habilidade, idLogado) {
        return this.httpClientService.post("/habilidade/" + habilidade.id + "/recomendacao/" + idLogado, {})
            .map(function (res) { return res.json() || {}; });
    };
    HabilidadeService.prototype.removerRecomendacaoHabilidade = function (habilidade, idLogado) {
        return this.httpClientService["delete"]("/habilidade/" + habilidade.id + "/recomendacao/" + idLogado)
            .map(function (res) { return res.json() || {}; });
    };
    HabilidadeService.prototype.create = function (habilidade) {
        return this.httpClientService.post('/habilidade', habilidade)
            .map(function (res) { return res.json(); });
    };
    HabilidadeService.prototype["delete"] = function (id) {
        return this.httpClientService["delete"]("/habilidade/" + id)
            .map(function (res) { return res.json() || {}; });
    };
    return HabilidadeService;
}());
HabilidadeService = __decorate([
    core_1.Injectable()
], HabilidadeService);
exports.HabilidadeService = HabilidadeService;
