"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var CapacitacaoComponent = (function () {
    function CapacitacaoComponent(capacitacaoService, confirmationService, authenticatedUserService) {
        this.capacitacaoService = capacitacaoService;
        this.confirmationService = confirmationService;
        this.authenticatedUserService = authenticatedUserService;
        this.exibeModalCapacitacao = false;
        this.capacitacoesClass = 'capacitacoes';
        this.arrowExpand = 'chevron-down';
        this.labelExpand = 'Ver mais';
        this.hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais
        this.hideAddIcon = true;
        this.afterInitialLoadingEmitter = new core_1.EventEmitter();
    }
    CapacitacaoComponent.prototype.ngOnInit = function () {
        this.getCapacitacoes();
    };
    CapacitacaoComponent.prototype.getCapacitacoes = function () {
        var _this = this;
        var servidor = this.authenticatedUserService.getServidor();
        this.isLoading = true;
        this.capacitacoes = [];
        this.capacitacaoService.getAll(servidor.id).subscribe(function (capacitacoes) {
            _this.capacitacoes = capacitacoes;
            _this.isLoading = false;
            if (_this.capacitacoes.length < 3) {
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
    CapacitacaoComponent.prototype.addNewCapacitacao = function () {
        this.objToEdit = null;
        this.exibeModalCapacitacao = true;
    };
    CapacitacaoComponent.prototype.editarCapacitacao = function (capacitacao) {
        this.objToEdit = capacitacao;
        this.exibeModalCapacitacao = true;
    };
    CapacitacaoComponent.prototype.deletarCapacitacao = function (id) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir este registro?',
            accept: function () {
                _this.capacitacaoService["delete"](id).subscribe(function (ok) {
                    _this.getCapacitacoes();
                });
            },
            reject: function () { }
        });
    };
    CapacitacaoComponent.prototype.verMais = function () {
        if (this.capacitacoesClass === 'capacitacoesExpandido') {
            this.capacitacoesClass = 'capacitacoes';
            this.arrowExpand = 'chevron-down';
            this.labelExpand = 'Ver mais';
        }
        else {
            this.capacitacoesClass = 'capacitacoesExpandido';
            this.arrowExpand = 'chevron-up';
            this.labelExpand = 'Ver menos';
        }
    };
    return CapacitacaoComponent;
}());
__decorate([
    core_1.Output('onAfterInitialLoading')
], CapacitacaoComponent.prototype, "afterInitialLoadingEmitter");
CapacitacaoComponent = __decorate([
    core_1.Component({
        selector: 'uns-capacitacao',
        templateUrl: 'capacitacao.component.html',
        styleUrls: ['capacitacao.component.css']
    })
], CapacitacaoComponent);
exports.CapacitacaoComponent = CapacitacaoComponent;
