import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CargoModalComponent } from './cargo-modal.component';

import {DataListModule, SharedModule} from 'primeng/primeng';
import {Cargo} from './cargo.model'

import {CargoService} from './cargo.service'

@Component({
  selector: 'uns-cargo',
  templateUrl: 'cargo.component.html',
  styleUrls: ['cargo.component.css']
})

export class CargoComponent implements OnInit {
  //constructor() { }

  modalCargo: CargoModalComponent;
  exibeModalCargo: boolean = false;
  objToEdit: Cargo;
  
  constructor(private cService: CargoService) { }
  cargos : Cargo[];
 
 /* 
  this.CountryService.GetCountries()
    .subscribe(countries => {
        this.myGridOptions.rowData = countries as CountryData[]
    })*/

  ngOnInit() {
    
    this.atualizaForm();
    //this.cargos = 
    
  }
  
  atualizaForm(): void
  {
    this.cService.getAllCargosFromId(1).subscribe(c => { 
      this.cargos = c as Cargo[];
      console.log("Cargos:");
      console.log(this.cargos);
    });
  }

  addNewCargo(): void {
    console.log('modal: ' + this.exibeModalCargo + '  interno: ');
  this.objToEdit = null;
    this.exibeModalCargo = true;

  }
  
    editarcargo(cargo : Cargo): void {
    console.log('editando cargo ');
    this.objToEdit = cargo;
    //this.modalCargo.setupForm();
    //this.modalCargo.setupForm();
    
    this.exibeModalCargo = true;

  }
  
    deletarcargo(id : number): void {
    console.log('deletando cargo id ' + id);
    this.cService.delete(id).subscribe(ok => { 
      console.log("Sucesso ao deletar:" + ok);
      this.atualizaForm();
    });

  }

}

