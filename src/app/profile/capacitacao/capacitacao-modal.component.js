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
var CapacitacaoModalComponent = (function () {
    function CapacitacaoModalComponent(capacitacaoService, formBuilder, authenticatedUserService, messageService) {
        this.capacitacaoService = capacitacaoService;
        this.formBuilder = formBuilder;
        this.authenticatedUserService = authenticatedUserService;
        this.messageService = messageService;
        this.visibleChange = new core_1.EventEmitter();
        this.onSave = new core_1.EventEmitter();
    }
    CapacitacaoModalComponent.prototype.ngOnChanges = function (changes) {
        this.anoAtual = (new Date()).getFullYear();
        if (this.capacitacaoEdit && this.visible) {
            this.capacitacaoForm = this.formBuilder.group({
                nomeCurso: [this.capacitacaoEdit.nomeCurso, forms_1.Validators.required],
                entidade: [this.capacitacaoEdit.entidade, forms_1.Validators.required],
                modalidade: [this.capacitacaoEdit.modalidade, forms_1.Validators.required],
                anoFim: [this.capacitacaoEdit.anoFim, forms_1.Validators.required],
                //  dataInicio: [this.capacitacaoEdit.dataInicio, Validators.required],
                // dataFim: [this.capacitacaoEdit.dataFim, Validators.required],
                cargaHoraria: [this.capacitacaoEdit.cargaHoraria, forms_1.Validators.required]
            });
            this.idToEdit = this.capacitacaoEdit.id;
            this.title = 'Editar informações de capacitação';
        }
        else {
            this.capacitacaoForm = this.formBuilder.group({
                entidade: ['', forms_1.Validators.required],
                nomeCurso: ['', forms_1.Validators.required],
                modalidade: ['', forms_1.Validators.required],
                anoFim: [2017, forms_1.Validators.required],
                // dataInicio: [null, Validators.required],
                // dataFim: [null, Validators.required],
                cargaHoraria: [null, forms_1.Validators.required]
            });
            this.idToEdit = null;
            this.title = 'Adicionar informações de capacitação';
            if (this.modalidade == null) {
                this.setupDropdownModalidade();
            }
        }
    };
    CapacitacaoModalComponent.prototype.pesquisarEntidades = function (event) {
        var _this = this;
        var entidade = event.query;
        this.capacitacaoService.searchEntidades(entidade).subscribe(function (entidades) {
            _this.sugestoesEntidade = entidades;
        });
    };
    CapacitacaoModalComponent.prototype.setupDropdownModalidade = function () {
        this.modalidade = [
            { label: 'Modalidade', value: null },
            { label: 'Presencial', value: 'Presencial' },
            { label: 'Semi-Presencial', value: 'Semi-Presencial' },
            { label: 'EAD', value: 'EAD' },
        ];
    };
    CapacitacaoModalComponent.prototype.onSubmit = function (isValid, capacitacao) {
        var _this = this;
        if (isValid) {
            var servidor = this.authenticatedUserService.getServidor();
            capacitacao.id = this.idToEdit;
            capacitacao.servidor_id = servidor.id;
            this.isSubmitting = true;
            this.capacitacaoService.save(capacitacao).subscribe(function (ok) {
                _this.isSubmitting = false;
                _this.messageService.sendSuccess({ detail: 'Capacitação atualizada com sucesso.' });
                _this.onSave.emit(true);
                _this.closeModal();
            });
        }
        else {
            functions_1.markFormGroupDirty(this.capacitacaoForm);
        }
    };
    CapacitacaoModalComponent.prototype.closeModal = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    return CapacitacaoModalComponent;
}());
__decorate([
    core_1.Input()
], CapacitacaoModalComponent.prototype, "visible");
__decorate([
    core_1.Input()
], CapacitacaoModalComponent.prototype, "capacitacaoEdit");
__decorate([
    core_1.Output()
], CapacitacaoModalComponent.prototype, "visibleChange");
__decorate([
    core_1.Output()
], CapacitacaoModalComponent.prototype, "onSave");
CapacitacaoModalComponent = __decorate([
    core_1.Component({
        selector: 'uns-capacitacao-modal',
        templateUrl: 'capacitacao-modal.component.html',
        styleUrls: ['capacitacao-modal.component.css']
    })
], CapacitacaoModalComponent);
exports.CapacitacaoModalComponent = CapacitacaoModalComponent;
