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
var FormacaoAcademicaModalComponent = (function () {
    function FormacaoAcademicaModalComponent(router, formBuilder, formacaoAcademicaService, authenticatedUserService, messageService) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.formacaoAcademicaService = formacaoAcademicaService;
        this.authenticatedUserService = authenticatedUserService;
        this.messageService = messageService;
        this.visibleChange = new core_1.EventEmitter();
        this.onSave = new core_1.EventEmitter();
        this.dateErrorMessage = true;
        this.today = new Date();
    }
    FormacaoAcademicaModalComponent.prototype.ngOnChanges = function (changes) {
        if (this.formacaoEdit && this.visible) {
            this.idToEdit = this.formacaoEdit.id;
            this.title = 'Editar formação acadêmica';
            this.formacaoForm = this.formBuilder.group({
                id: [this.idToEdit],
                curso: [this.formacaoEdit.curso, forms_1.Validators.required],
                dataInicio: [this.formacaoEdit.dataInicio, forms_1.Validators.required],
                dataFim: [this.formacaoEdit.dataFim, forms_1.Validators.required],
                nivel: [this.formacaoEdit.nivel, forms_1.Validators.required],
                instituicao_academica_id: [this.formacaoEdit['instituicaoAcademica'], forms_1.Validators.required]
            });
            console.log(this.formacaoEdit['instituicaoAcademica']);
        }
        else {
            this.setupForm();
            this.idToEdit = null;
            this.title = 'Adicionar formação acadêmica';
        }
    };
    FormacaoAcademicaModalComponent.prototype.ngOnInit = function () {
        this.setYearRange();
    };
    FormacaoAcademicaModalComponent.prototype.setupForm = function () {
        this.setupDropdownOptions();
        this.formacaoForm = this.formBuilder.group({
            id: [null],
            curso: [null, forms_1.Validators.required],
            dataInicio: [null, forms_1.Validators.required],
            dataFim: [null, forms_1.Validators.required],
            nivel: [null, forms_1.Validators.required],
            instituicao_academica_id: [null, forms_1.Validators.required]
        });
    };
    FormacaoAcademicaModalComponent.prototype.setupDropdownOptions = function () {
        this.nivel = [
            { label: 'Nível do curso', value: null },
            { label: 'Fundamental', value: 'Fundamental' },
            { label: 'Médio', value: 'Médio' },
            { label: 'Superior', value: 'Superior' },
        ];
    };
    FormacaoAcademicaModalComponent.prototype.pesquisarInstituicoesAcademicas = function (event) {
        var _this = this;
        this.formacaoAcademicaService.searchInstituicao(event.query).subscribe(function (instituicoesAcademicas) {
            _this.resultadoInstituicoesAcademicas = instituicoesAcademicas;
        });
    };
    FormacaoAcademicaModalComponent.prototype.pesquisarCursos = function (event) {
        var _this = this;
        this.formacaoAcademicaService.searchCurso(event.query).subscribe(function (cursos) {
            _this.resultadoCursos = cursos;
        });
    };
    FormacaoAcademicaModalComponent.prototype.onSubmit = function (isValid, formacaoAcademica) {
        var _this = this;
        if (isValid) {
            var servidor = this.authenticatedUserService.getServidor();
            formacaoAcademica.id = this.idToEdit;
            formacaoAcademica.instituicao_academica_id = formacaoAcademica.instituicao_academica_id['id'];
            formacaoAcademica.servidor_id = servidor.id;
            this.isSubmitting = true;
            this.formacaoAcademicaService.save(formacaoAcademica).subscribe(function (ok) {
                _this.isSubmitting = false;
                _this.messageService.sendSuccess({ detail: 'Formação acadêmica atualizada com sucesso.' });
                _this.onSave.emit(true);
                _this.closeModal();
            });
        }
        else {
            functions_1.markFormGroupDirty(this.formacaoForm);
        }
    };
    FormacaoAcademicaModalComponent.prototype.setYearRange = function () {
        var currentYear = (new Date()).getFullYear();
        this.calendarYearRange = currentYear - 100 + ":" + (currentYear + 10);
    };
    FormacaoAcademicaModalComponent.prototype.closeModal = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    return FormacaoAcademicaModalComponent;
}());
__decorate([
    core_1.Input()
], FormacaoAcademicaModalComponent.prototype, "visible");
__decorate([
    core_1.Input()
], FormacaoAcademicaModalComponent.prototype, "formacaoEdit");
__decorate([
    core_1.Output()
], FormacaoAcademicaModalComponent.prototype, "visibleChange");
__decorate([
    core_1.Output()
], FormacaoAcademicaModalComponent.prototype, "onSave");
FormacaoAcademicaModalComponent = __decorate([
    core_1.Component({
        selector: 'uns-formacao-academica-modal',
        templateUrl: 'formacao-academica-modal.component.html',
        styleUrls: ['formacao-academica-modal.component.css']
    })
], FormacaoAcademicaModalComponent);
exports.FormacaoAcademicaModalComponent = FormacaoAcademicaModalComponent;
