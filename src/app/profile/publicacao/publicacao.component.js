"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var PublicacaoComponent = (function () {
    function PublicacaoComponent(publicacaoService, confirmationService, authenticatedUserService, messageService) {
        this.publicacaoService = publicacaoService;
        this.confirmationService = confirmationService;
        this.authenticatedUserService = authenticatedUserService;
        this.messageService = messageService;
        this.exibeModalPublicacao = false;
        this.publicacoesClass = 'publicacoes';
        this.arrowExpand = 'chevron-down';
        this.labelExpand = 'Ver mais';
        this.hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais
        this.hideAddIcon = true;
        this.afterInitialLoadingEmitter = new core_1.EventEmitter();
    }
    PublicacaoComponent.prototype.ngOnInit = function () {
        this.atualizarListaPublicacoes();
        var today = new Date().getFullYear().toString();
        // this.publicacoes = [
        //   {
        //     id: 0,
        //     titulo: "Livro Angular",
        //     ano: today,
        //     local: "Vila Velha",
        //     tipo: "Produção bibliográfica",
        //     servidor_id: 1
        //   },
        //   {
        //     id: 1,
        //     titulo: "Livro Node",
        //     ano: today,
        //     local: "Vila Velha",
        //     tipo: "Produção bibliográfica",
        //     servidor_id: 1
        //   },
        //   {
        //     id: 2,
        //     titulo: "Livro Javascript",
        //     ano: today,
        //     local: "Vix",
        //     tipo: "Produção bibliográfica",
        //     servidor_id: 1
        //   },
        // ];
        if (this.publicacoes.length < 3) {
            this.hideVerMais = true;
        }
        else {
            this.hideVerMais = false;
        }
    };
    PublicacaoComponent.prototype.atualizarListaPublicacoes = function () {
        var _this = this;
        var servidor = this.authenticatedUserService.getServidor();
        this.isLoading = true;
        this.publicacoes = [];
        this.publicacaoService.getAll(servidor.id).subscribe(function (publicacoes) {
            _this.isLoading = false;
            _this.publicacoes = publicacoes;
            if (_this.publicacoes.length < 3) {
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
    PublicacaoComponent.prototype.verMais = function () {
        if (this.publicacoesClass === 'publicacoesExpandido') {
            this.publicacoesClass = 'publicacoes';
            this.arrowExpand = 'chevron-down';
            this.labelExpand = 'Ver mais';
        }
        else {
            this.publicacoesClass = 'publicacoesExpandido';
            this.arrowExpand = 'chevron-up';
            this.labelExpand = 'Ver menos';
        }
    };
    PublicacaoComponent.prototype.adicionarPublicacao = function () {
        this.objToEdit = null;
        this.exibeModalPublicacao = true;
    };
    PublicacaoComponent.prototype.editarPublicacao = function (publicacaoEdit) {
        this.objToEdit = publicacaoEdit;
        this.exibeModalPublicacao = true;
    };
    PublicacaoComponent.prototype.deletarPublicacao = function (publicacao) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir este registro? \n',
            accept: function () {
                _this.publicacaoService["delete"](publicacao.id).subscribe(function (success) {
                    _this.atualizarListaPublicacoes();
                });
            },
            reject: function () { }
        });
    };
    return PublicacaoComponent;
}());
__decorate([
    core_1.Output('onAfterInitialLoading')
], PublicacaoComponent.prototype, "afterInitialLoadingEmitter");
PublicacaoComponent = __decorate([
    core_1.Component({
        selector: 'uns-publicacao',
        templateUrl: 'publicacao.component.html',
        styleUrls: ['publicacao.component.css']
    })
], PublicacaoComponent);
exports.PublicacaoComponent = PublicacaoComponent;
