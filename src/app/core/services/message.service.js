"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var MessageService = (function () {
    function MessageService() {
        this.messages = new Rx_1.Subject();
    }
    MessageService.prototype.send = function (message) {
        this.messages.next(message);
    };
    MessageService.prototype.sendSuccess = function (message) {
        message.severity = 'success';
        message.summary = message.summary || 'Sucesso';
        this.send(message);
    };
    MessageService.prototype.sendInfo = function (message) {
        message.severity = 'info';
        message.summary = message.summary || 'Atenção';
        this.send(message);
    };
    MessageService.prototype.sendWarn = function (message) {
        message.severity = 'warn';
        message.summary = message.summary || 'Atenção';
        this.send(message);
    };
    MessageService.prototype.sendError = function (message) {
        message.severity = 'error';
        message.summary = message.summary || 'Erro';
        this.send(message);
    };
    MessageService.prototype.listen = function () {
        return this.messages.asObservable();
    };
    return MessageService;
}());
MessageService = __decorate([
    core_1.Injectable()
], MessageService);
exports.MessageService = MessageService;
