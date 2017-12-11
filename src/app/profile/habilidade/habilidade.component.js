"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var HabilidadeComponent = (function () {
    function HabilidadeComponent(cService, confirmationService, authenticatedUserService, messageService, el) {
        this.cService = cService;
        this.confirmationService = confirmationService;
        this.authenticatedUserService = authenticatedUserService;
        this.messageService = messageService;
        this.el = el;
        this.exibeModalhabilidade = false;
        this.habilidadesClass = 'habilidades';
        this.arrowExpand = 'chevron-down';
        this.labelExpand = 'Ver mais';
        this.hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais
        this.hideAddIcon = true;
        this.afterInitialLoadingEmitter = new core_1.EventEmitter();
        this.exibeModalRecomendacao = false;
    }
    HabilidadeComponent.prototype.ngOnInit = function () {
        this.atualizaForm();
    };
    HabilidadeComponent.prototype.onClickDetalheRecomendacao = function (habilidade) {
        if (habilidade.numRecomendacoes > 0) {
            this.exibeModalRecomendacao = true;
            this.habilidade = habilidade;
        }
    };
    HabilidadeComponent.prototype.atualizaForm = function () {
        var _this = this;
        var self = this;
        var servidor = this.authenticatedUserService.getServidor();
        this.isLoading = true;
        this.cService.getAllHabilidadesFromId(servidor.id).subscribe(function (c) {
            _this.isLoading = false;
            _this.habilidades = c;
            if (_this.habilidades.length < 3) {
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
    HabilidadeComponent.prototype.addNewhabilidade = function () {
        console.log('modal: ' + this.exibeModalhabilidade + '  interno: ');
        this.objToEdit = null;
        this.exibeModalhabilidade = true;
    };
    HabilidadeComponent.prototype.editarhabilidade = function (habilidade) {
        console.log('editando habilidade ');
        this.objToEdit = habilidade;
        this.exibeModalhabilidade = true;
    };
    HabilidadeComponent.prototype.addHabilidade = function (value) {
        var self = this;
        setTimeout(function () {
            var elements = self.el.nativeElement.querySelectorAll('.ui-chips-token');
            var element = elements[elements.length - 1];
            element.firstElementChild.click();
            var servidor = self.authenticatedUserService.getServidor();
            self.cService.savehabilidade({ id: 0, nome: value, numRecomendacoes: 0, servidor_id: servidor.id, recomendado: false }).subscribe(function (ok) {
                self.messageService.sendSuccess({ detail: 'Habilidade incluída com sucesso.' });
                self.atualizaForm();
            });
        }, 0);
    };
    HabilidadeComponent.prototype.removeHabilidade = function (element, habilidade) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja remover esta habilidade? As recomendações serão perdidas. \n',
            accept: function () {
                _this.cService["delete"](habilidade.id).subscribe(function (success) {
                    _this.messageService.sendSuccess({ detail: 'Habilidade removida com sucesso.' });
                    element.parentElement.querySelector('span.ui-chips-token-icon.fa.fa-fw.fa-close').click();
                });
            },
            reject: function () { }
        });
    };
    HabilidadeComponent.prototype.deletarhabilidade = function (habilidade) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir este registro? \n',
            accept: function () {
                _this.cService["delete"](habilidade.id).subscribe(function (success) {
                    console.log("Sucesso ao deletar:");
                    _this.atualizaForm();
                });
            },
            reject: function () { }
        });
    };
    HabilidadeComponent.prototype.verMais = function () {
        if (this.habilidadesClass === 'habilidadesExpandido') {
            this.habilidadesClass = 'habilidades';
            this.arrowExpand = 'chevron-down';
            this.labelExpand = 'Ver mais';
        }
        else {
            this.habilidadesClass = 'habilidadesExpandido';
            this.arrowExpand = 'chevron-up';
            this.labelExpand = 'Ver menos';
        }
    };
    return HabilidadeComponent;
}());
__decorate([
    core_1.Output('onAfterInitialLoading')
], HabilidadeComponent.prototype, "afterInitialLoadingEmitter");
HabilidadeComponent = __decorate([
    core_1.Component({
        selector: 'uns-habilidade',
        templateUrl: 'habilidade.component.html',
        styleUrls: ['habilidade.component.css']
    })
], HabilidadeComponent);
exports.HabilidadeComponent = HabilidadeComponent;
