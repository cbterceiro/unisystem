"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var habilidade_service_1 = require("../profile/habilidade/habilidade.service");
var functions_1 = require("../shared/functions");
var ServidorDetalheComponent = (function () {
    function ServidorDetalheComponent(confirmationService, activatedRoute, servidorService, habilidadeService, messageService, renderer, authenticatedUserService, el) {
        this.confirmationService = confirmationService;
        this.activatedRoute = activatedRoute;
        this.servidorService = servidorService;
        this.habilidadeService = habilidadeService;
        this.messageService = messageService;
        this.renderer = renderer;
        this.authenticatedUserService = authenticatedUserService;
        this.el = el;
        this.exibeModalRecomendacao = false;
    }
    ServidorDetalheComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.activatedRoute.snapshot.params['id'];
        this.isLoading = true;
        this.servidorService.getByIdSemFoto(id, this.authenticatedUserService.getServidor().id).subscribe(function (servidor) {
            _this.servidor = servidor;
            _this.isLoading = false;
        });
        this.servidorService.getFotoById(id).subscribe(function (servidor) {
            functions_1.delay(function (_) { return _this.updateBackgroundImage(servidor.foto); });
            _this.isLoading = false;
        });
        // 
        this.initVerMais();
    };
    ServidorDetalheComponent.prototype.onClickDetalheRecomendacao = function (habilidade) {
        if (habilidade.numRecomendacoes > 0) {
            this.exibeModalRecomendacao = true;
            this.habilidade = habilidade;
        }
    };
    ServidorDetalheComponent.prototype.podeRecomendar = function () {
        return this.servidor.id != this.authenticatedUserService.getServidor().id;
    };
    ServidorDetalheComponent.prototype.onClickRecomendacao = function (habilidade) {
        var _this = this;
        var self = this;
        if (habilidade.recomendado == 1) {
            this.confirmationService.confirm({
                message: 'Tem certeza que deseja remover esta recomendação? \n',
                accept: function () {
                    self.habilidadeService.removerRecomendacaoHabilidade(habilidade, _this.authenticatedUserService.getServidor().id)
                        .subscribe(function (success) {
                        self.messageService.sendSuccess({ detail: 'Recomendação removida com sucesso.' });
                        var find = self.servidor.habilidade.find(function (model) { return model.id === habilidade.id; });
                        find.recomendado = 0;
                        find.numRecomendacoes -= 1;
                    });
                },
                reject: function () { }
            });
        }
        else {
            self.habilidadeService.recomendarHabilidade(habilidade, this.authenticatedUserService.getServidor().id)
                .subscribe(function (success) {
                self.messageService.sendSuccess({ detail: 'Habilidade recomendada com sucesso.' });
                var find = self.servidor.habilidade.find(function (model) { return model.id === habilidade.id; });
                find.recomendado = 1;
                find.numRecomendacoes += 1;
            });
        }
    };
    ServidorDetalheComponent.prototype.updateBackgroundImage = function (base64Img) {
        var element = this.el.nativeElement.querySelector('.servidor-foto');
        if (base64Img && element) {
            this.renderer.setStyle(element, 'background-image', "url('" + base64Img + "')");
        }
    };
    ServidorDetalheComponent.prototype.initVerMais = function () {
        this.verMais = {
            cargos: false,
            funcoes: false,
            formacoes: false,
            capacitacoes: false,
            publicacoes: false
        };
    };
    ServidorDetalheComponent.prototype.verMaisToggle = function (obj) {
    };
    return ServidorDetalheComponent;
}());
ServidorDetalheComponent = __decorate([
    core_1.Component({
        providers: [habilidade_service_1.HabilidadeService],
        selector: 'uns-servidor-detalhe',
        templateUrl: 'servidor-detalhe.component.html',
        styleUrls: ['servidor-detalhe.component.css']
    })
], ServidorDetalheComponent);
exports.ServidorDetalheComponent = ServidorDetalheComponent;
