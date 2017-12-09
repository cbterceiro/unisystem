"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var functions_1 = require("../shared/functions");
var ServidoresComponent = (function () {
    function ServidoresComponent(servidorService, route, router, el, renderer) {
        this.servidorService = servidorService;
        this.route = route;
        this.router = router;
        this.el = el;
        this.renderer = renderer;
        this.defaultImageUrl = '/assets/img/default-user-icon.png';
    }
    ServidoresComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams
            .subscribe(function (params) {
            _this.nomeCompleto = params.nome;
            _this.instituicao = params.instituicao;
            _this.cargo = params.cargo;
            _this.orgao = params.orgao;
            _this.setor = params.setor;
            _this.funcao = params.funcao;
            _this.habilidade = params.habilidade;
            _this.limite = 10;
            _this.offset = 0;
            _this.searchServidores();
        });
    };
    ServidoresComponent.prototype.updateBackgroundImage = function (base64Img, id) {
        var element = this.el.nativeElement.querySelector('.servidor-foto-' + id);
        if (base64Img && element) {
            this.renderer.setStyle(element, 'background-image', "url('" + base64Img + "')");
        }
    };
    ServidoresComponent.prototype.searchServidores = function () {
        var _this = this;
        this.isLoading = true;
        /*  this.servidorService.getByPesquisa(
            this.nomeCompleto, this.instituicao, this.cargo, this.funcao, this.orgao, this.setor, this.limite, this.offset
          ).subscribe(servidores => {
            this.servidores = servidores;
            this.isLoading = false;
          });*/
        this.servidorService.getByPesquisa2(this.nomeCompleto, this.instituicao, this.cargo, this.orgao, this.setor, this.habilidade, this.funcao, this.limite, this.offset).subscribe(function (servidores) {
            console.log(servidores);
            _this.servidores = servidores;
            //Buscando imagem separada a query fica mais rápida...
            for (var i = 0, len = _this.servidores.length; i < len; i++) {
                _this.servidorService.getFotoById(_this.servidores[i].id).subscribe(function (servidor) {
                    functions_1.delay(function (_) {
                        for (var i = 0, len = _this.servidores.length; i < len; i++) {
                            if (_this.servidores[i].id == servidor.id) {
                                _this.servidores[i].foto = servidor.foto;
                                break;
                            }
                        }
                    });
                });
            }
            _this.isLoading = false;
        });
    };
    ServidoresComponent.prototype.redirectToServidorDetalhe = function (id) {
        this.router.navigate([id, 'detalhe'], { relativeTo: this.route });
    };
    ServidoresComponent.prototype.imgServidor = function (id) {
        this.servidorService.getFotoById(id).subscribe(function (servidor) {
        });
        return "";
    };
    return ServidoresComponent;
}());
ServidoresComponent = __decorate([
    core_1.Component({
        selector: 'uns-servidores',
        templateUrl: 'servidores.component.html',
        styleUrls: ['servidores.component.css']
    })
], ServidoresComponent);
exports.ServidoresComponent = ServidoresComponent;
