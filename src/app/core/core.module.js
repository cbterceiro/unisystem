"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var session_service_1 = require("./services/session.service");
var http_client_service_1 = require("./services/http-client.service");
var file_upload_service_1 = require("./services/file-upload.service");
var message_service_1 = require("./services/message.service");
var servidor_service_1 = require("./services/servidor.service");
var noticia_service_1 = require("./services/noticia.service");
var error_handler_1 = require("./error-handler");
var CoreModule = (function () {
    function CoreModule() {
    }
    return CoreModule;
}());
CoreModule = __decorate([
    core_1.NgModule({
        providers: [
            session_service_1.SessionService,
            http_client_service_1.HttpClientService,
            file_upload_service_1.FileUploadService,
            message_service_1.MessageService,
            servidor_service_1.ServidorService,
            noticia_service_1.NoticiaService,
            { provide: core_1.ErrorHandler, useClass: error_handler_1.ErrorHandler },
        ]
    })
], CoreModule);
exports.CoreModule = CoreModule;
