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
  
  constructor(private cService: CargoService) { }
  cargos : Cargo[];
 
 /* 
  this.CountryService.GetCountries()
    .subscribe(countries => {
        this.myGridOptions.rowData = countries as CountryData[]
    })*/

  ngOnInit() {
    
    this.cService.getAllCargos().subscribe(c => { this.cargos = c as Cargo[];});
    //this.cargos = 
    
  }

  addNewCargo(): void {
    console.log('modal: ' + this.exibeModalCargo + '  interno: ');
    // this.router.navigate(['/prifle/cargo', { show: true }], { skipLocationChange: true });
    this.exibeModalCargo = true;

  }

}

