import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServidorService } from '../core/servidor.service';
import { Servidor } from '../core/servidor.model';

@Component({
  selector: 'uns-servidores',
  templateUrl: 'servidores.component.html',
  // styleUrls: ['funcao.component.css']
})
export class ServidoresComponent implements OnInit {

  servidores: Servidor[];

  instituicao: string;
  nomeCompleto: string;
  cargo: string;
  setor: string;
  areaInteresse: string;
  limite: number;
  offset: number;

  constructor(
    private cService: ServidorService,
    private route: ActivatedRoute,
  ) { }

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
        this.limite = 10;
        this.offset = 0;
        console.log('nome: ' + this.nomeCompleto);
        this.atualizaForm();
      });


  }

  atualizaForm(): void {
    this.cService.getByPesquisa(this.nomeCompleto, this.instituicao, this.cargo, this.setor, this.areaInteresse, this.limite, this.offset).subscribe(c => {
      this.servidores = c as Servidor[];
      console.log("servidores:");
      console.log(this.servidores);
    });
  }


  getAllServidores(): void {
    this.cService.getAll().subscribe(c => {
      this.servidores = c as Servidor[];
      console.log("servidores:");
      console.log(this.servidores);
    });
  }

}
