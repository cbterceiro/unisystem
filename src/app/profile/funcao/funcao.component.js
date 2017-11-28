"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var FuncaoComponent = (function () {
    function FuncaoComponent(funcaoService, confirmationService, authenticatedUserService) {
        this.funcaoService = funcaoService;
        this.confirmationService = confirmationService;
        this.authenticatedUserService = authenticatedUserService;
        this.exibeModalfuncao = false;
        this.funcoesClass = 'funcoes';
        this.arrowExpand = 'chevron-down';
        this.labelExpand = 'Ver mais';
        this.hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais
        this.hideAddIcon = true;
        this.afterInitialLoadingEmitter = new core_1.EventEmitter();
    }
    FuncaoComponent.prototype.ngOnInit = function () {
        this.getFuncoes();
    };
    FuncaoComponent.prototype.getFuncoes = function () {
        var _this = this;
        var servidor = this.authenticatedUserService.getServidor();
        this.isLoading = true;
        this.funcoes = [];
        this.funcaoService.getFuncoesByServidorId(servidor.id).subscribe(function (funcoes) {
            _this.funcoes = funcoes;
            _this.isLoading = false;
            if (_this.funcoes.length < 3) {
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
    FuncaoComponent.prototype.addNewFuncao = function () {
        this.objToEdit = null;
        this.exibeModalfuncao = true;
    };
    FuncaoComponent.prototype.editarFuncao = function (funcao) {
        this.objToEdit = funcao;
        this.exibeModalfuncao = true;
    };
    FuncaoComponent.prototype.deletarFuncao = function (id) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir este registro?',
            accept: function () {
                _this.funcaoService["delete"](id).subscribe(function (ok) {
                    _this.getFuncoes();
                });
            },
            reject: function () { }
        });
    };
    FuncaoComponent.prototype.verMais = function () {
        if (this.funcoesClass === 'funcoesExpandido') {
            this.funcoesClass = 'funcoes';
            this.arrowExpand = 'chevron-down';
            this.labelExpand = 'Ver mais';
        }
        else {
            this.funcoesClass = 'funcoesExpandido';
            this.arrowExpand = 'chevron-up';
            this.labelExpand = 'Ver menos';
        }
    };
    return FuncaoComponent;
}());
__decorate([
    core_1.Output('onAfterInitialLoading')
], FuncaoComponent.prototype, "afterInitialLoadingEmitter");
FuncaoComponent = __decorate([
    core_1.Component({
        selector: 'uns-funcao',
        templateUrl: 'funcao.component.html',
        styleUrls: ['funcao.component.css']
    })
], FuncaoComponent);
exports.FuncaoComponent = FuncaoComponent;
