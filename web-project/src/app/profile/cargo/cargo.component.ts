import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CargoModalComponent } from './cargo-modal.component';

import {DataTableModule, SharedModule} from 'primeng/primeng';

@Component({
  selector: 'uns-cargo',
  templateUrl: 'cargo.component.html',
  styleUrls: ['cargo.component.css']
})

export class CargoComponent implements OnInit {
  //constructor() { }

  modalCargo: CargoModalComponent;
  exibeModalCargo: boolean = false;

  ngOnInit() { }

  addNewCargo(): void {
    console.log('modal: ' + this.exibeModalCargo + '  interno: ');
    // this.router.navigate(['/prifle/cargo', { show: true }], { skipLocationChange: true });
    this.exibeModalCargo = true;

  }

}

