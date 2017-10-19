import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/primeng';

import { AuthenticatedUserService } from '../../authentication';

import { Cargo } from './cargo.model';
import { CargoService } from './cargo.service';

@Component({
  selector: 'uns-cargo',
  templateUrl: 'cargo.component.html',
  styleUrls: ['cargo.component.css']
})
export class CargoComponent implements OnInit {

  exibeModalCargo = false;
  objToEdit: Cargo;
  cargos: Cargo[];

  cargosClass = 'cargos';
  arrowExpand = 'chevron-down';
  labelExpand = 'Ver mais';
  hideVerMais = true; // flag para mostrar/esconder o botão de Ver Mais

  hideAddIcon = true;
  isLoading: boolean;

  constructor(
    private cargoService: CargoService,
    private confirmationService: ConfirmationService,
    private authenticatedUserService: AuthenticatedUserService,
  ) { }

  ngOnInit() {
    this.getCargos();
  }

  getCargos(): void {
    const servidor = this.authenticatedUserService.getServidor();
    this.isLoading = true;
    this.cargos = [];
    this.cargoService.getCargosByServidorId(servidor.id).subscribe(cargos => {
      this.cargos = cargos;
      this.isLoading = false;
      if (this.cargos.length < 3) {
        this.hideVerMais = true;
      } else {
        this.hideVerMais = false;
      }
    });
  }

  addNewCargo(): void {
    this.objToEdit = null;
    this.exibeModalCargo = true;
  }

  editarCargo(cargo: Cargo): void {
    this.objToEdit = cargo;
    this.exibeModalCargo = true;
  }

  deletarCargo(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este registro?',
      accept: () => {
        this.cargoService.delete(id).subscribe(ok => {
          this.getCargos();
        });
      },
      reject: () => { }
    });
  }

  verMais(): void {
    if (this.cargosClass === 'cargosExpandido') {
      this.cargosClass = 'cargos';
      this.arrowExpand = 'chevron-down';
      this.labelExpand = 'Ver mais';
    } else {
      this.cargosClass = 'cargosExpandido';
      this.arrowExpand = 'chevron-up';
      this.labelExpand = 'Ver menos';
    }
  }
}

