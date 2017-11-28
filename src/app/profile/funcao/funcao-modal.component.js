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
var FuncaoModalComponent = (function () {
    function FuncaoModalComponent(router, activatedRoute, formBuilder, funcaoService, authenticatedUserService, messageService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.formBuilder = formBuilder;
        this.funcaoService = funcaoService;
        this.authenticatedUserService = authenticatedUserService;
        this.messageService = messageService;
        this.visibleChange = new core_1.EventEmitter();
        this.onSave = new core_1.EventEmitter();
    }
    FuncaoModalComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.funcaoEdit && this.visible) {
            this.funcaoForm = this.formBuilder.group({
                nome: [this.funcaoEdit.nome, forms_1.Validators.required],
                setor: [this.funcaoEdit.setor],
                orgao: [this.funcaoEdit.orgao],
                atual: [this.funcaoEdit.atual],
                descricao: [this.funcaoEdit.descricao],
                dataInicio: [this.funcaoEdit.dataInicio, forms_1.Validators.required],
                dataFim: [this.funcaoEdit.dataFim, forms_1.Validators.required]
            });
            this.idToEdit = this.funcaoEdit.id;
            this.title = 'Editar informações de função';
        }
        else {
            this.funcaoForm = this.formBuilder.group({
                nome: ['', forms_1.Validators.required],
                setor: null,
                orgao: null,
                atual: [false],
                descricao: [''],
                dataInicio: [null, forms_1.Validators.required],
                dataFim: [null, forms_1.Validators.required]
            });
            this.funcaoForm.get('atual')
                .valueChanges
                .subscribe(function (value) { return _this.handleChange(value); });
            this.idToEdit = null;
            this.title = 'Adicionar informações de função';
        }
    };
    FuncaoModalComponent.prototype.pesquisarFuncao = function (event) {
        var _this = this;
        var nomeFuncao = event.query;
        this.funcaoService.searchFuncoesCadastradas(nomeFuncao).subscribe(function (funcoes) {
            _this.sugestoesFuncao = funcoes;
        });
    };
    FuncaoModalComponent.prototype.pesquisarOrgao = function (event) {
        var _this = this;
        var nomeOrgao = event.query;
        this.funcaoService.searchOrgaos(nomeOrgao).subscribe(function (orgao) {
            _this.sugestoesOrgao = orgao;
        });
    };
    FuncaoModalComponent.prototype.pesquisarSetor = function (event) {
        var _this = this;
        var nomeSetor = event.query;
        this.funcaoService.searchSetores(nomeSetor).subscribe(function (orgao) {
            _this.sugestoesSetor = orgao;
        });
    };
    FuncaoModalComponent.prototype.handleChange = function (value) {
        var dataFinalForm = this.funcaoForm.get('dataFim');
        console.log(dataFinalForm);
        if (value) {
            this.atualChecked = true;
            dataFinalForm.setValue(null, { onlySelf: true });
            dataFinalForm.clearValidators();
            dataFinalForm.updateValueAndValidity();
            // dataFinalForm.enabled();
        }
        else {
            this.atualChecked = false;
            dataFinalForm.setValidators(forms_1.Validators.required);
            dataFinalForm.updateValueAndValidity();
            // dataFinalForm.disable();
        }
    };
    FuncaoModalComponent.prototype.onSubmit = function (isValid, funcao) {
        var _this = this;
        if (isValid) {
            var servidor = this.authenticatedUserService.getServidor();
            funcao.id = this.idToEdit;
            funcao.servidor_id = servidor.id;
            funcao.orgao_id = funcao.orgao ? funcao.orgao.id : null;
            funcao.setor_id = funcao.setor.id;
            this.isSubmitting = true;
            this.funcaoService.save(funcao).subscribe(function (success) {
                _this.isSubmitting = false;
                _this.messageService.sendSuccess({ detail: 'Função atualizada com sucesso.' });
                _this.onSave.emit(true);
                _this.closeModal();
            });
        }
        else {
            functions_1.markFormGroupDirty(this.funcaoForm);
        }
    };
    FuncaoModalComponent.prototype.closeModal = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    return FuncaoModalComponent;
}());
__decorate([
    core_1.Input()
], FuncaoModalComponent.prototype, "visible");
__decorate([
    core_1.Input()
], FuncaoModalComponent.prototype, "funcaoEdit");
__decorate([
    core_1.Output()
], FuncaoModalComponent.prototype, "visibleChange");
__decorate([
    core_1.Output()
], FuncaoModalComponent.prototype, "onSave");
FuncaoModalComponent = __decorate([
    core_1.Component({
        selector: 'uns-funcao-modal',
        templateUrl: 'funcao-modal.component.html',
        styleUrls: ['funcao-modal.component.css']
    })
], FuncaoModalComponent);
exports.FuncaoModalComponent = FuncaoModalComponent;
