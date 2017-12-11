"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var CertificacaoComponent = (function () {
    function CertificacaoComponent(certificacaoService, confirmationService, authenticatedUserService) {
        this.certificacaoService = certificacaoService;
        this.confirmationService = confirmationService;
        this.authenticatedUserService = authenticatedUserService;
        this.exibeModalCertificacao = false;
        this.certificacoesClass = 'certificacoes';
        this.arrowExpand = 'chevron-down';
        this.labelExpand = 'Ver mais';
        this.hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais
        this.hideAddIcon = true;
        this.afterInitialLoadingEmitter = new core_1.EventEmitter();
    }
    CertificacaoComponent.prototype.ngOnInit = function () {
        this.getCertificacoes();
    };
    CertificacaoComponent.prototype.getCertificacoes = function () {
        var _this = this;
        var servidor = this.authenticatedUserService.getServidor();
        this.isLoading = true;
        this.certificacoes = [];
        this.certificacaoService.getAll(servidor.id).subscribe(function (certificacoes) {
            _this.certificacoes = certificacoes;
            _this.isLoading = false;
            if (_this.certificacoes.length < 3) {
                _this.hideVerMais = true;
            }
            else {
                _this.hideVerMais = false;
            }
            if (!_this.finishedInitialLoading) {
                _this.finishedInitialLoading = true;
                _this.afterInitialLoadingEmitter.emit();
            }
        });
    };
    CertificacaoComponent.prototype.addNewCertificacao = function () {
        this.objToEdit = null;
        this.exibeModalCertificacao = true;
    };
    CertificacaoComponent.prototype.editarCertificacao = function (certificacao) {
        this.objToEdit = certificacao;
        this.exibeModalCertificacao = true;
    };
    CertificacaoComponent.prototype.deletarCertificacao = function (id) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir este registro?',
            accept: function () {
                _this.certificacaoService["delete"](id).subscribe(function (ok) {
                    _this.getCertificacoes();
                });
            },
            reject: function () { }
        });
    };
    CertificacaoComponent.prototype.verMais = function () {
        if (this.certificacoesClass === 'certificacoesExpandido') {
            this.certificacoesClass = 'certificacoes';
            this.arrowExpand = 'chevron-down';
            this.labelExpand = 'Ver mais';
        }
        else {
            this.certificacoesClass = 'certificacoesExpandido';
            this.arrowExpand = 'chevron-up';
            this.labelExpand = 'Ver menos';
        }
    };
    return CertificacaoComponent;
}());
__decorate([
    core_1.Output('onAfterInitialLoading')
], CertificacaoComponent.prototype, "afterInitialLoadingEmitter");
CertificacaoComponent = __decorate([
    core_1.Component({
        selector: 'uns-certificacao',
        templateUrl: 'certificacao.component.html',
        styleUrls: ['certificacao.component.css']
    })
], CertificacaoComponent);
exports.CertificacaoComponent = CertificacaoComponent;
