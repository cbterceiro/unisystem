"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var SelectServidorComponent = (function () {
    function SelectServidorComponent(authenticatedUserService, servidorService, router) {
        this.authenticatedUserService = authenticatedUserService;
        this.servidorService = servidorService;
        this.router = router;
    }
    SelectServidorComponent.prototype.ngOnInit = function () {
        this.getServidores();
    };
    SelectServidorComponent.prototype.getServidores = function () {
        var _this = this;
        this.loading = true;
        this.servidorService.getAll().subscribe(function (servidores) {
            _this.servidores = servidores.map(function (s) {
                return { label: s.nome, value: s };
            });
            _this.servidores.unshift({ label: 'Selecione um servidor', value: null });
            _this.loading = false;
        }, function (error) {
            _this.errorMessage = error.json().msg || 'Falha na conexão com o servidor';
            _this.loading = false;
            _this.disabled = true;
        });
    };
    SelectServidorComponent.prototype.login = function () {
        if (this.servidorSelecionado) {
            this.authenticatedUserService.setServidor(this.servidorSelecionado);
            this.router.navigate(['']);
        }
        else {
            this.errorMessage = 'Selecione um servidor';
        }
    };
    return SelectServidorComponent;
}());
SelectServidorComponent = __decorate([
    core_1.Component({
        selector: 'uns-select-servidor',
        templateUrl: 'select-servidor.component.html',
        styleUrls: ['select-servidor.component.css']
    })
], SelectServidorComponent);
exports.SelectServidorComponent = SelectServidorComponent;
