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
}

