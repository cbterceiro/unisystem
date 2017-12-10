"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var environment_1 = require("../../../environments/environment");
var HttpClientService = (function () {
    function HttpClientService(http) {
        this.http = http;
        var path = environment_1.environment.backendServerPath;
        this.backendServerPath = path.endsWith('/') ? path.slice(0, -1) : path;
    }
    HttpClientService.prototype.get = function (path) {
        return this.http.get(this.backendServerPath + path, {});
    };
    HttpClientService.prototype.search = function (path, searchModel) {
        console.log('url:', this.backendServerPath + path + searchModel.toString());
        return this.http.get(this.backendServerPath + path + searchModel.toString(), {});
    };
    HttpClientService.prototype.put = function (path, body) {
        return this.http.put(this.backendServerPath + path, body, {});
    };
    HttpClientService.prototype.post = function (path, body) {
        return this.http.post(this.backendServerPath + path, body, {});
    };
    HttpClientService.prototype["delete"] = function (path) {
        return this.http["delete"](this.backendServerPath + path, {});
    };
    return HttpClientService;
}());
HttpClientService = __decorate([
    core_1.Injectable()
], HttpClientService);
exports.HttpClientService = HttpClientService;
