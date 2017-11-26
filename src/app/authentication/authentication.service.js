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
var _1 = require("../core/");
var AuthenticationService = (function () {
    function AuthenticationService(httpClientService, sessionService, router) {
        this.httpClientService = httpClientService;
        this.sessionService = sessionService;
        this.router = router;
    }
    AuthenticationService.prototype.login = function (email, password) {
        return Observable_1.Observable.of(true);
    };
    AuthenticationService.prototype.logout = function () {
        this.sessionService.clear();
        this.router.navigate(['login']);
    };
    Object.defineProperty(AuthenticationService.prototype, "isAuthenticated", {
        get: function () {
            return this.sessionService.hasItem(_1.SessionKeys.user);
        },
        enumerable: true,
        configurable: true
    });
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable()
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
