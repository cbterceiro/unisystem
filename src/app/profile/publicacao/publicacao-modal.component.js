"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var functions_1 = require("../../shared/functions");
var PublicacaoModalComponent = (function () {
    function PublicacaoModalComponent(router, formBuilder, publicacaoService, authenticatedUserService, messageService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.publicacaoService = publicacaoService;
        this.authenticatedUserService = authenticatedUserService;
        this.messageService = messageService;
        this.visibleChange = new core_1.EventEmitter();
        this.onSave = new core_1.EventEmitter();
        this.today = new Date();
    }
    PublicacaoModalComponent.prototype.ngOnChanges = function (changes) {
        if (this.publicacaoEdit && this.visible) {
            this.idToEdit = this.publicacaoEdit.id;
            this.title = 'Editar publicação';
            this.publicacaoForm = this.formBuilder.group({
                id: [this.idToEdit],
                titulo: [this.publicacaoEdit.titulo, forms_1.Validators.required],
                ano: [this.publicacaoEdit.ano, forms_1.Validators.required],
                local: [this.publicacaoEdit.local, forms_1.Validators.required],
                tipo: [this.publicacaoEdit.tipo, forms_1.Validators.required]
            });
        }
        else {
            this.setupForm();
            this.idToEdit = null;
            this.title = 'Adicionar publicação';
        }
    };
    PublicacaoModalComponent.prototype.ngOnInit = function () {
    };
    PublicacaoModalComponent.prototype.setupForm = function () {
        this.setupDropdownOptions();
        this.publicacaoForm = this.formBuilder.group({
            id: [null],
            titulo: [null, forms_1.Validators.required],
            local: [null, forms_1.Validators.required],
            ano: [null, forms_1.Validators.required],
            tipo: [null, forms_1.Validators.required]
        });
    };
    PublicacaoModalComponent.prototype.setupDropdownOptions = function () {
        this.tipo = [
            { label: 'Selecione o tipo de publicação', value: null },
            { label: 'Produção Bibliográfica', value: 'Produção Bibliográfica' },
            { label: 'Produção Técnica', value: 'Produção Técnica' },
            { label: 'Produção Artística/Cultural', value: 'Produção Artística/Cultural' },
            { label: 'Outro', value: 'Outro' },
        ];
        // console.log("array ", this.tipo[2]);
        this.ano = [{ label: "Selecione o ano", value: null }];
        var year = new Date();
        var ano_atual = year.getFullYear();
        for (var i = 0; i <= 100; i++) {
            this.ano[i + 1] = { label: (ano_atual - i).toString(), value: (ano_atual - i) };
        }
    };
    PublicacaoModalComponent.prototype.onSubmit = function (isValid, publicacao) {
        var _this = this;
        if (isValid) {
            var servidor = this.authenticatedUserService.getServidor();
            publicacao.id = this.idToEdit;
            publicacao.servidor_id = servidor.id;
            this.isSubmitting = true;
            this.publicacaoService.save(publicacao).subscribe(function (ok) {
                _this.isSubmitting = false;
                _this.messageService.sendSuccess({ detail: 'Publicacao atualizada com sucesso.' });
                _this.onSave.emit(true);
                _this.closeModal();
            });
        }
        else {
            functions_1.markFormGroupDirty(this.publicacaoForm);
        }
    };
    PublicacaoModalComponent.prototype.closeModal = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    return PublicacaoModalComponent;
}());
__decorate([
    core_1.Input()
], PublicacaoModalComponent.prototype, "visible");
__decorate([
    core_1.Input()
], PublicacaoModalComponent.prototype, "publicacaoEdit");
__decorate([
    core_1.Output()
], PublicacaoModalComponent.prototype, "visibleChange");
__decorate([
    core_1.Output()
], PublicacaoModalComponent.prototype, "onSave");
PublicacaoModalComponent = __decorate([
    core_1.Component({
        selector: 'uns-publicacao-modal',
        templateUrl: 'publicacao-modal.component.html',
        styleUrls: ['publicacao-modal.component.css']
    })
], PublicacaoModalComponent);
exports.PublicacaoModalComponent = PublicacaoModalComponent;
