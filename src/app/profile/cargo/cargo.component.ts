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

  isLoading: boolean;

  constructor(
    private cService: CargoService,
    private confirmationService: ConfirmationService,
    private authenticatedUserService: AuthenticatedUserService,
  ) { }

  ngOnInit() {
    this.atualizaForm();
  }

  atualizaForm(): void {
    this.isLoading = true;
    const servidor = this.authenticatedUserService.getServidor();
    this.cService.getAllCargosFromId(servidor.id).subscribe(c => {
      this.cargos = c;
      console.log('Cargos:');
      console.log(this.cargos);
      this.isLoading = false;
    });
  }

  addNewCargo(): void {
    this.objToEdit = null;
    this.exibeModalCargo = true;
  }

  editarCargo(cargo: Cargo): void {
    console.log('editando cargo ');
    this.objToEdit = cargo;

    this.exibeModalCargo = true;
  }

  deletarCargo(id: number): void {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este registro?',
      accept: () => {
        this.cService.delete(id).subscribe(ok => {
          this.atualizaForm();
        });
      },
      reject: () => { }
    });
  }
}

