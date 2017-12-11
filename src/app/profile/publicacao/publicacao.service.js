"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var PublicacaoService = (function () {
    function PublicacaoService(httpClientService) {
        this.httpClientService = httpClientService;
    }
    PublicacaoService.prototype.getAll = function (id) {
        return this.httpClientService.get("/servidores/" + id + "/publicacao")
            .map(function (res) { return res.json() || []; });
    };
    PublicacaoService.prototype.getById = function (id) {
        return this.httpClientService.get("/publicacao/" + id)
            .map(function (res) { return res.json() || {}; });
    };
    PublicacaoService.prototype["delete"] = function (id) {
        return this.httpClientService["delete"]("/publicacao/" + id)
            .map(function (res) { return res.json() || {}; });
    };
    PublicacaoService.prototype.save = function (publicacao) {
        return publicacao.id ? this.update(publicacao) : this.create(publicacao);
    };
    PublicacaoService.prototype.create = function (publicacao) {
        return this.httpClientService.post('/publicacao', publicacao)
            .map(function (res) { return res.json(); });
    };
    PublicacaoService.prototype.update = function (publicacao) {
        return this.httpClientService.put("/publicacao/" + publicacao.id, publicacao)
            .map(function (res) { return res.json(); });
    };
    return PublicacaoService;
}());
PublicacaoService = __decorate([
    core_1.Injectable()
], PublicacaoService);
exports.PublicacaoService = PublicacaoService;
