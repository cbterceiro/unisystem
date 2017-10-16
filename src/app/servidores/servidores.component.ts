import { Component, OnInit } from '@angular/core';

import {ServidorService} from '../profile/servidor.service'
import {Servidor} from '../profile/servidor.model'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'uns-servidores',
  templateUrl: 'servidores.component.html',
  //styleUrls: ['funcao.component.css']
})
export class ServidoresComponent implements OnInit {
  
  constructor(
  private cService: ServidorService,
  private route: ActivatedRoute) { }
  servidores : Servidor[];
  
  instituicao: string;
  nomeCompleto: string;
  cargo: string;
  setor: string;
  areaInteresse: string;
  limite: number;
  offset: number;
  

  ngOnInit() { 
    
    //this.getAllServidores();
    
   this.route.queryParams
      .subscribe(params => {
        //console.log(params); // {order: "popular"}

        this.nomeCompleto = params.nome;
        this.instituicao = params.instituicao;
        this.cargo = params.cargo;
        this.setor = params.setor;
        this.areaInteresse = params.interesse;
        //this.order = params.order;
        //console.log(this.order); // popular
        this.atualizaForm();
      });
    
    
  }
  
  atualizaForm(): void
  {
    this.cService.getByPesquisa(this.nomeCompleto, this.instituicao, this.cargo, this.setor, this.areaInteresse, this.limite, this.offset).subscribe(c => { 
      this.servidores = c as Servidor[];
      console.log("servidores:");
       console.log(this.servidores);
    });
  }
  
  
  getAllServidores(): void
  {
    this.cService.getAll().subscribe(c => { 
      this.servidores = c as Servidor[];
      console.log("servidores:");
       console.log(this.servidores);
    });
  }
  
}
