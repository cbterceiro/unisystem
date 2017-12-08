"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ErrorHandler = (function () {
    function ErrorHandler(injector, messageService) {
        this.injector = injector;
        this.messageService = messageService;
    }
    ErrorHandler.prototype.handleError = function (error) {
        if (this.isBackendError(error)) {
            var msg = error.json().msg;
            if (msg === 'ResourceRequest timed out') {
                msg = 'Problemas na conexão com o servidor.';
            }
            this.messageService.sendError({ detail: msg });
        }
        console.error(error);
    };
    ErrorHandler.prototype.isBackendError = function (error) {
        return error.status >= 300 && error.url && !error.ok;
    };
    return ErrorHandler;
}());
ErrorHandler = __decorate([
    core_1.Injectable()
], ErrorHandler);
exports.ErrorHandler = ErrorHandler;
