"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
exports.SessionKeys = {
    user: { value: 'user' }
};
var SessionService = (function () {
    function SessionService() {
    }
    SessionService.prototype.getItem = function (key) {
        var item = sessionStorage.getItem(key.value);
        return item ? JSON.parse(item) : null;
    };
    SessionService.prototype.setItem = function (key, item) {
        sessionStorage.setItem(key.value, typeof item === 'string' ? item : JSON.stringify(item));
    };
    SessionService.prototype.hasItem = function (key) {
        return sessionStorage.getItem(key.value) !== null;
    };
    SessionService.prototype.clear = function () {
        sessionStorage.clear();
    };
    return SessionService;
}());
SessionService = __decorate([
    core_1.Injectable()
], SessionService);
exports.SessionService = SessionService;
