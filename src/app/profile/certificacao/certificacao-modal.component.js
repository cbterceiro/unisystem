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
var CertificacaoModalComponent = (function () {
    function CertificacaoModalComponent(certificacaoService, formBuilder, authenticatedUserService, messageService) {
        this.certificacaoService = certificacaoService;
        this.formBuilder = formBuilder;
        this.authenticatedUserService = authenticatedUserService;
        this.messageService = messageService;
        this.visibleChange = new core_1.EventEmitter();
        this.onSave = new core_1.EventEmitter();
    }
    CertificacaoModalComponent.prototype.ngOnChanges = function (changes) {
        this.anoAtual = (new Date()).getFullYear();
        if (this.certificacaoEdit && this.visible) {
            this.certificacaoForm = this.formBuilder.group({
                nomeCurso: [this.certificacaoEdit.nomeCurso, forms_1.Validators.required],
                entidade: [this.certificacaoEdit.entidade, forms_1.Validators.required],
                anoFim: [this.certificacaoEdit.anoFim, forms_1.Validators.required]
            });
            this.idToEdit = this.certificacaoEdit.id;
            this.title = 'Editar informações de certificação';
        }
        else {
            this.certificacaoForm = this.formBuilder.group({
                entidade: ['', forms_1.Validators.required],
                nomeCurso: ['', forms_1.Validators.required],
                anoFim: [2017, forms_1.Validators.required]
            });
            this.idToEdit = null;
            this.title = 'Adicionar informações de certificação';
        }
    };
    CertificacaoModalComponent.prototype.pesquisarEntidades = function (event) {
        var _this = this;
        var entidade = event.query;
        this.certificacaoService.searchEntidades(entidade).subscribe(function (entidades) {
            _this.sugestoesEntidade = entidades;
        });
    };
    CertificacaoModalComponent.prototype.onSubmit = function (isValid, certificacao) {
        var _this = this;
        if (isValid) {
            var servidor = this.authenticatedUserService.getServidor();
            certificacao.id = this.idToEdit;
            certificacao.servidor_id = servidor.id;
            this.isSubmitting = true;
            this.certificacaoService.save(certificacao).subscribe(function (ok) {
                _this.isSubmitting = false;
                _this.messageService.sendSuccess({ detail: 'Certificação atualizada com sucesso.' });
                _this.onSave.emit(true);
                _this.closeModal();
            });
        }
        else {
            functions_1.markFormGroupDirty(this.certificacaoForm);
        }
    };
    CertificacaoModalComponent.prototype.closeModal = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    return CertificacaoModalComponent;
}());
__decorate([
    core_1.Input()
], CertificacaoModalComponent.prototype, "visible");
__decorate([
    core_1.Input()
], CertificacaoModalComponent.prototype, "certificacaoEdit");
__decorate([
    core_1.Output()
], CertificacaoModalComponent.prototype, "visibleChange");
__decorate([
    core_1.Output()
], CertificacaoModalComponent.prototype, "onSave");
CertificacaoModalComponent = __decorate([
    core_1.Component({
        selector: 'uns-certificacao-modal',
        templateUrl: 'certificacao-modal.component.html',
        styleUrls: ['certificacao-modal.component.css']
    })
], CertificacaoModalComponent);
exports.CertificacaoModalComponent = CertificacaoModalComponent;
