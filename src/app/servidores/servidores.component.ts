import { Component, OnInit } from '@angular/core';

import {ServidorService} from '../profile/servidor.service'
import {Servidor} from '../profile/servidor.model'

@Component({
  selector: 'uns-servidores',
  templateUrl: 'servidores.component.html',
  //styleUrls: ['funcao.component.css']
})
export class ServidoresComponent implements OnInit {
  
  constructor(private cService: ServidorService) { }
  servidores : Servidor[];

  ngOnInit() { 
    
    this.atualizaForm();
    
  }
  
  atualizaForm(): void
  {
    this.cService.getAll().subscribe(c => { 
      this.servidores = c as Servidor[];
      console.log("servidores:");
       console.log(this.servidores);
    });
  }
  
  
  
}
