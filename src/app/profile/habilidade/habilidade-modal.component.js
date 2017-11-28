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
var HabilidadeModalComponent = (function () {
    function HabilidadeModalComponent(router, activatedRoute, formBuilder, cService, authenticatedUserService, messageService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.formBuilder = formBuilder;
        this.cService = cService;
        this.authenticatedUserService = authenticatedUserService;
        this.messageService = messageService;
        this.visibleChange = new core_1.EventEmitter();
        this.onSave = new core_1.EventEmitter();
    }
    HabilidadeModalComponent.prototype.ngOnInit = function () {
        this.setupForm();
        this.idToEdit = 0;
        console.log("passou init modal habilidade");
    };
    HabilidadeModalComponent.prototype.ngOnChanges = function (changes) {
        if (this.habilidadeEdit && this.visible) {
            console.log("habilidade: " + this.habilidadeEdit.id);
            console.log(this.habilidadeEdit.id);
            this.habilidadeForm = this.formBuilder.group({
                nome: [this.habilidadeEdit.nome, forms_1.Validators.required],
                numRecomendacoes: ['']
            });
            this.idToEdit = this.habilidadeEdit.id;
        }
        else {
            this.setupForm();
            this.idToEdit = 0;
        }
    };
    HabilidadeModalComponent.prototype.setupForm = function () {
        console.log("passou setupform modal habilidade");
        this.habilidadeForm = this.formBuilder.group({
            nome: ['', forms_1.Validators.required],
            numRecomendacoes: ['']
        });
    };
    HabilidadeModalComponent.prototype.pesquisarhabilidades = function (event) {
        var _this = this;
        this.cService.searchHabilidades(event.query).subscribe(function (habilidades) {
            _this.resultadosHabilidades = habilidades;
        });
    };
    HabilidadeModalComponent.prototype.pesquisarhabilidade = function (event) {
        var _this = this;
        //Verificar essa gamb
        var arrayHabilidades;
        if (!this.resultadoHabilidades)
            this.resultadoHabilidades = [];
        this.cService.getAllHabilidades().subscribe(function (val) {
            console.log(val);
            for (var i = 0; i < val.length; i++) {
                if (_this.resultadoHabilidades.indexOf(val[i].nome) == -1)
                    _this.resultadoHabilidades.push(val[i].nome);
            }
        });
        console.log('Buscando habilidades');
    };
    HabilidadeModalComponent.prototype.pesquisarSetor = function (event) {
        //this.resultadoSetores = this.cService.getAllSetoresContains(setor);
        console.log('buscando setores');
        this.resultadoHabilidades = ['Setor 1', 'Setor 2'];
    };
    HabilidadeModalComponent.prototype.onSubmit = function (isValid, habilidade) {
        var _this = this;
        isValid = true; //isso deveria já vir preenchido
        if (this.idToEdit > 0)
            habilidade.id = this.idToEdit;
        else
            habilidade.id = null;
        console.log('id habilidade: ' + habilidade.id);
        console.log('isValid', isValid);
        console.log('habilidade', habilidade);
        if (isValid) {
            var servidor = this.authenticatedUserService.getServidor();
            habilidade.servidor_id = servidor.id;
            for (var i = 0; i < habilidade.nome.length; i++) {
                this.cService.savehabilidade({ id: habilidade.id, nome: habilidade.nome[i], numRecomendacoes: habilidade.numRecomendacoes, servidor_id: habilidade.servidor_id }).subscribe(function (ok) {
                    _this.isSubmitting = false;
                    _this.messageService.sendSuccess({ detail: 'Habilidade atualizada com sucesso.' });
                    _this.onSave.emit(true);
                    //if(i == habilidade.nome.length-1)
                    _this.closeModal();
                });
            }
        }
    };
    HabilidadeModalComponent.prototype.closeModal = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    return HabilidadeModalComponent;
}());
__decorate([
    core_1.Input()
], HabilidadeModalComponent.prototype, "visible");
__decorate([
    core_1.Input()
], HabilidadeModalComponent.prototype, "habilidadeEdit");
__decorate([
    core_1.Output()
], HabilidadeModalComponent.prototype, "visibleChange");
__decorate([
    core_1.Output()
], HabilidadeModalComponent.prototype, "onSave");
HabilidadeModalComponent = __decorate([
    core_1.Component({
        selector: 'uns-habilidade-modal',
        templateUrl: 'habilidade-modal.component.html',
        styleUrls: ['habilidade-modal.component.css']
    })
], HabilidadeModalComponent);
exports.HabilidadeModalComponent = HabilidadeModalComponent;
