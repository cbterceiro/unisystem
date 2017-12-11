"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var HabilidadeModalComponent = (function () {
    function HabilidadeModalComponent(habilidadeService) {
        this.habilidadeService = habilidadeService;
        this.visibleChange = new core_1.EventEmitter();
        this.defaultImageUrl = '/assets/img/default-user-icon.png';
    }
    HabilidadeModalComponent.prototype.ngOnInit = function () {
        this.isLoadingRecomendacao = true;
    };
    HabilidadeModalComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.habilidade && this.visible) {
            this.isLoadingRecomendacao = true;
            this.habilidadeService.getQuemRecomendou(this.habilidade)
                .subscribe(function (servidores) {
                _this.isLoadingRecomendacao = false;
                if (servidores) {
                    _this.quemRecomendouList = servidores;
                }
            });
        }
    };
    HabilidadeModalComponent.prototype.closeModal = function () {
        this.visible = false;
        this.habilidade = null;
        this.quemRecomendouList = null;
        this.visibleChange.emit(this.visible);
    };
    return HabilidadeModalComponent;
}());
__decorate([
    core_1.Input()
], HabilidadeModalComponent.prototype, "visible");
__decorate([
    core_1.Input()
], HabilidadeModalComponent.prototype, "habilidade");
__decorate([
    core_1.Output()
], HabilidadeModalComponent.prototype, "visibleChange");
HabilidadeModalComponent = __decorate([
    core_1.Component({
        selector: 'uns-habilidade-modal',
        templateUrl: 'habilidade-modal.component.html',
        styleUrls: ['habilidade-modal.component.css']
    })
], HabilidadeModalComponent);
exports.HabilidadeModalComponent = HabilidadeModalComponent;
