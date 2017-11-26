"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var FormacaoAcademicaComponent = (function () {
    function FormacaoAcademicaComponent(formacaoAcademicaService, confirmationService, authenticatedUserService, messageService) {
        this.formacaoAcademicaService = formacaoAcademicaService;
        this.confirmationService = confirmationService;
        this.authenticatedUserService = authenticatedUserService;
        this.messageService = messageService;
        this.exibeModalFormacao = false;
        this.formacoesClass = 'formacoes';
        this.arrowExpand = 'chevron-down';
        this.labelExpand = 'Ver mais';
        this.hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais
        this.hideAddIcon = true;
        this.afterInitialLoadingEmitter = new core_1.EventEmitter();
    }
    FormacaoAcademicaComponent.prototype.ngOnInit = function () {
        this.atualizarListaFormacoes();
    };
    FormacaoAcademicaComponent.prototype.atualizarListaFormacoes = function () {
        var _this = this;
        var servidor = this.authenticatedUserService.getServidor();
        this.isLoading = true;
        this.formacoesAcademicas = [];
        this.formacaoAcademicaService.getAll(servidor.id).subscribe(function (formacoesAcademicas) {
            _this.isLoading = false;
            _this.formacoesAcademicas = formacoesAcademicas;
            if (_this.formacoesAcademicas.length < 3) {
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
    FormacaoAcademicaComponent.prototype.verMais = function () {
        if (this.formacoesClass === 'formacoesExpandido') {
            this.formacoesClass = 'formacoes';
            this.arrowExpand = 'chevron-down';
            this.labelExpand = 'Ver mais';
        }
        else {
            this.formacoesClass = 'formacoesExpandido';
            this.arrowExpand = 'chevron-up';
            this.labelExpand = 'Ver menos';
        }
    };
    FormacaoAcademicaComponent.prototype.adicionarFormacaoAcademica = function () {
        this.objToEdit = null;
        this.exibeModalFormacao = true;
    };
    FormacaoAcademicaComponent.prototype.editarFormacao = function (formacaoEdit) {
        this.objToEdit = formacaoEdit;
        this.exibeModalFormacao = true;
    };
    FormacaoAcademicaComponent.prototype.deletarFormacao = function (formacao) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir este registro? \n',
            accept: function () {
                _this.formacaoAcademicaService["delete"](formacao.id).subscribe(function (success) {
                    _this.atualizarListaFormacoes();
                });
            },
            reject: function () { }
        });
    };
    return FormacaoAcademicaComponent;
}());
__decorate([
    core_1.Output('onAfterInitialLoading')
], FormacaoAcademicaComponent.prototype, "afterInitialLoadingEmitter");
FormacaoAcademicaComponent = __decorate([
    core_1.Component({
        selector: 'uns-formacao-academica',
        templateUrl: 'formacao-academica.component.html',
        styleUrls: ['formacao-academica.component.css']
    })
], FormacaoAcademicaComponent);
exports.FormacaoAcademicaComponent = FormacaoAcademicaComponent;
