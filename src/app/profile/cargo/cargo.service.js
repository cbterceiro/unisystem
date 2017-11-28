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
var cargo_model_1 = require("./cargo.model");
var CargoService = (function () {
    function CargoService(httpClientService) {
        this.httpClientService = httpClientService;
    }
    CargoService.prototype.getCargosByServidorId = function (id) {
        var _this = this;
        return this.httpClientService.get("/servidores/" + id + "/cargo")
            .map(function (res) { return _this.jsonToCargos(res.json() || []); });
    };
    CargoService.prototype.searchCargos = function (name) {
        return this.httpClientService.search("/cargos/pesquisa", new core_2.SearchModel({
            fields: ['nome'],
            filters: ["nome like %" + name + "%"]
        })).map(function (res) { return (res.json() || []).map(function (c) { return c.nome; }); });
    };
    CargoService.prototype.searchCargosCadastrados = function (name) {
        return this.httpClientService.search("/cargosCadastrados/pesquisa", new core_2.SearchModel({
            fields: ['nome'],
            filters: ["nome like %" + name + "%"]
        })).map(function (res) { return (res.json() || []).map(function (c) { return c.nome; }); });
    };
    CargoService.prototype.save = function (cargo) {
        return cargo.id ? this.update(cargo) : this.create(cargo);
    };
    CargoService.prototype.update = function (cargo) {
        return this.httpClientService.put("/cargo/" + cargo.id, cargo)
            .map(function (res) { return res.json(); });
    };
    CargoService.prototype.create = function (cargo) {
        return this.httpClientService.post('/cargo', cargo)
            .map(function (res) { return res.json(); });
    };
    CargoService.prototype["delete"] = function (id) {
        return this.httpClientService["delete"]("/cargo/" + id)
            .map(function (res) { return res.json() || {}; });
    };
    CargoService.prototype.jsonToCargo = function (json) {
        var cargo = Object.assign(new cargo_model_1.Cargo(), json);
        if (json.dataInicio) {
            cargo.dataInicio = new Date(json.dataInicio);
        }
        if (json.dataFim) {
            cargo.dataFim = new Date(json.dataFim);
        }
        delete cargo['created_at'];
        delete cargo['updated_at'];
        return cargo;
    };
    CargoService.prototype.jsonToCargos = function (json) {
        var _this = this;
        return json.map(function (obj) { return _this.jsonToCargo(obj); });
    };
    return CargoService;
}());
CargoService = __decorate([
    core_1.Injectable()
], CargoService);
exports.CargoService = CargoService;
