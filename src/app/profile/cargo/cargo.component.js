"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var CargoComponent = (function () {
    function CargoComponent(cargoService, confirmationService, authenticatedUserService) {
        this.cargoService = cargoService;
        this.confirmationService = confirmationService;
        this.authenticatedUserService = authenticatedUserService;
        this.exibeModalCargo = false;
        this.cargosClass = 'cargos';
        this.arrowExpand = 'chevron-down';
        this.labelExpand = 'Ver mais';
        this.hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais
        this.hideAddIcon = true;
        this.afterInitialLoadingEmitter = new core_1.EventEmitter();
    }
    CargoComponent.prototype.ngOnInit = function () {
        this.getCargos();
    };
    CargoComponent.prototype.getCargos = function () {
        var _this = this;
        var servidor = this.authenticatedUserService.getServidor();
        this.isLoading = true;
        this.cargos = [];
        this.cargoService.getCargosByServidorId(servidor.id).subscribe(function (cargos) {
            _this.cargos = cargos;
            console.log(cargos);
            _this.isLoading = false;
            if (_this.cargos.length < 3) {
                _this.hideVerMais = true;
            }
            else {
                _this.hideVerMais = false;
            }
            if (!_this.finishedInitialLoading) {
                _this.finishedInitialLoading = true;
                _this.afterInitialLoadingEmitter.emit();
            }
        });
    };
    CargoComponent.prototype.addNewCargo = function () {
        this.objToEdit = null;
        this.exibeModalCargo = true;
    };
    CargoComponent.prototype.editarCargo = function (cargo) {
        this.objToEdit = cargo;
        this.exibeModalCargo = true;
    };
    CargoComponent.prototype.deletarCargo = function (id) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir este registro?',
            accept: function () {
                _this.cargoService["delete"](id).subscribe(function (ok) {
                    _this.getCargos();
                });
            },
            reject: function () { }
        });
    };
    CargoComponent.prototype.verMais = function () {
        if (this.cargosClass === 'cargosExpandido') {
            this.cargosClass = 'cargos';
            this.arrowExpand = 'chevron-down';
            this.labelExpand = 'Ver mais';
        }
        else {
            this.cargosClass = 'cargosExpandido';
            this.arrowExpand = 'chevron-up';
            this.labelExpand = 'Ver menos';
        }
    };
    return CargoComponent;
}());
__decorate([
    core_1.Output('onAfterInitialLoading')
], CargoComponent.prototype, "afterInitialLoadingEmitter");
CargoComponent = __decorate([
    core_1.Component({
        selector: 'uns-cargo',
        templateUrl: 'cargo.component.html',
        styleUrls: ['cargo.component.css']
    })
], CargoComponent);
exports.CargoComponent = CargoComponent;
