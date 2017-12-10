"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var noticia_model_1 = require("../models/noticia.model");
var search_model_1 = require("../models/search.model");
var NoticiaService = (function () {
    function NoticiaService(httpClientService, fileUploadService) {
        this.httpClientService = httpClientService;
        this.fileUploadService = fileUploadService;
    }
    NoticiaService.prototype.getNoticiasExternas = function () {
        return this.httpClientService.get('/noticias-externas')
            .map(function (res) { return res.json() || []; });
    };
    NoticiaService.prototype.getNoticias = function () {
        var _this = this;
        return this.httpClientService.search('/noticias', new search_model_1.SearchModel({
            fields: ['id', 'titulo', 'conteudo', 'imgDestaque'],
            orderBy: ['created_at desc']
        })).map(function (res) { return _this.jsonToNoticias(res.json() || []); });
    };
    NoticiaService.prototype.create = function (noticia) {
        return this.httpClientService.post('/noticias', noticia)
            .map(function (res) { return res.json().id; });
    };
    NoticiaService.prototype.updateImgDestaque = function (id, file) {
        return this.fileUploadService.uploadFile("/noticias/" + id + "/foto", 'foto', file)
            .map(function (res) { return res.json() || {}; });
    };
    NoticiaService.prototype.jsonToNoticia = function (json) {
        var noticia = Object.assign(new noticia_model_1.Noticia(), json);
        return noticia;
    };
    NoticiaService.prototype.jsonToNoticias = function (json) {
        var _this = this;
        return json.map(function (obj) { return _this.jsonToNoticia(obj); });
    };
    return NoticiaService;
}());
NoticiaService = __decorate([
    core_1.Injectable()
], NoticiaService);
exports.NoticiaService = NoticiaService;
