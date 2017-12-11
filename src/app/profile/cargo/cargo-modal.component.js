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
var CargoModalComponent = (function () {
    function CargoModalComponent(router, activatedRoute, formBuilder, cargoService, funcaoService, authenticatedUserService, messageService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.formBuilder = formBuilder;
        this.cargoService = cargoService;
        this.funcaoService = funcaoService;
        this.authenticatedUserService = authenticatedUserService;
        this.messageService = messageService;
        this.visibleChange = new core_1.EventEmitter();
        this.onSave = new core_1.EventEmitter();
    }
    CargoModalComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.cargoEdit && this.visible) {
            this.cargoForm = this.formBuilder.group({
                nome: [this.cargoEdit.nome, forms_1.Validators.required],
                orgao: [this.cargoEdit.orgao],
                setor: [this.cargoEdit.setor],
                orgao_id: [this.cargoEdit.orgao.id],
                atual: [this.cargoEdit.atual],
                dataInicio: [this.cargoEdit.dataInicio, forms_1.Validators.required],
                dataFim: [this.cargoEdit.dataFim, forms_1.Validators.required]
            });
            this.atualChecked = this.cargoEdit.atual;
            this.idToEdit = this.cargoEdit.id;
            this.title = 'Editar informações de cargo';
        }
        else {
            this.atualChecked = false;
            this.cargoForm = this.formBuilder.group({
                nome: ['', forms_1.Validators.required],
                setor: ['', forms_1.Validators.required],
                orgao: [null, forms_1.Validators.required],
                orgao_id: null,
                atual: [false],
                dataInicio: [null, forms_1.Validators.required],
                dataFim: [null, forms_1.Validators.required]
            });
            this.idToEdit = null;
            this.title = 'Adicionar informações de cargo';
        }
        this.cargoForm.get('atual')
            .valueChanges
            .subscribe(function (value) { return _this.handleChange(value); });
    };
    CargoModalComponent.prototype.pesquisarCargo = function (event) {
        var _this = this;
        var nomeCargo = event.query;
        this.cargoService.searchCargosCadastrados(nomeCargo).subscribe(function (cargos) {
            _this.sugestoesCargo = cargos;
        });
    };
    CargoModalComponent.prototype.pesquisarOrgao = function (event) {
        var _this = this;
        var nomeOrgao = event.query;
        this.funcaoService.searchOrgaos(nomeOrgao).subscribe(function (orgao) {
            _this.sugestoesOrgao = orgao;
        });
    };
    CargoModalComponent.prototype.pesquisarSetor = function (event) {
        var _this = this;
        var nomeSetor = event.query;
        this.funcaoService.searchSetores(nomeSetor).subscribe(function (orgao) {
            _this.sugestoesSetor = orgao;
        });
    };
    CargoModalComponent.prototype.handleChange = function (value) {
        var dataFinalForm = this.cargoForm.get('dataFim');
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
    CargoModalComponent.prototype.onSubmit = function (isValid, cargo) {
        var _this = this;
        if (isValid) {
            var servidor = this.authenticatedUserService.getServidor();
            cargo.id = this.idToEdit;
            cargo.servidor_id = servidor.id;
            cargo.orgao_id = cargo.orgao.id;
            cargo.setor_id = cargo.setor.id;
            this.isSubmitting = true;
            this.cargoService.save(cargo).subscribe(function (success) {
                _this.isSubmitting = false;
                _this.messageService.sendSuccess({ detail: 'Cargo atualizado com sucesso.' });
                _this.onSave.emit(true);
                _this.closeModal();
            });
        }
        else {
            functions_1.markFormGroupDirty(this.cargoForm);
        }
    };
    CargoModalComponent.prototype.closeModal = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    return CargoModalComponent;
}());
__decorate([
    core_1.Input()
], CargoModalComponent.prototype, "visible");
__decorate([
    core_1.Input()
], CargoModalComponent.prototype, "cargoEdit");
__decorate([
    core_1.Output()
], CargoModalComponent.prototype, "visibleChange");
__decorate([
    core_1.Output()
], CargoModalComponent.prototype, "onSave");
CargoModalComponent = __decorate([
    core_1.Component({
        selector: 'uns-cargo-modal',
        templateUrl: 'cargo-modal.component.html',
        styleUrls: ['cargo-modal.component.css']
    })
], CargoModalComponent);
exports.CargoModalComponent = CargoModalComponent;
