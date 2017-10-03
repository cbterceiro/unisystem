import { Component, EventEmitter, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { Cargo } from './cargo.model';
import {CargoService} from './cargo.service'

@Component({
  selector: 'uns-cargo-modal',
  templateUrl: 'cargo-modal.component.html',
  styleUrls: ['cargo-modal.component.css']
})
export class CargoModalComponent implements OnInit {

  @Input() visible: boolean;
  @Input() cargoEdit: Cargo;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  cargoForm: FormGroup;
  dataInicio: Date;
  dataFim: Date;
  nomeFuncao: string;

  resultadoFuncoes: string[]; //resultado da pesquisa de funcoes
  resultadoSetores: string[]; //resultado da pesquisa de setores
  idToEdit:number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cService: CargoService,
  ) { }

  ngOnInit() {
    // this.subscribeToRouteParams();
    this.setupForm();
    this.idToEdit = 0;
    console.log("passou init modal cargo");
  }
  
  
  ngOnChanges(changes: SimpleChanges)
  {
    if(this.cargoEdit && this.visible)
    {
     console.log("cargo: " + this.cargoEdit.dataInicio);
     console.log(this.cargoEdit.dataInicio);

     //descobrir forma de preencer a porcaria do calendar

     
     this.cargoForm = this.formBuilder.group({
      funcao: [this.cargoEdit.nome, Validators.required],
      setor: [''],
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
    });

      this.idToEdit = this.cargoEdit.id;
    }
    else
    {
    this.setupForm();
    this.idToEdit = 0;
    }
  }



  setupForm(): void {
    //this.setupDropdownOptions();

console.log("passou setupform modal cargo");

    this.cargoForm = this.formBuilder.group({
      funcao: ['', Validators.required],
      setor: [''],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
    });
  }
  
  pesquisarFuncao(event) {
    //Verificar essa gamb
     let arrayFuncoes;
     if(!this.resultadoFuncoes)
      this.resultadoFuncoes = [];
    this.cService.getAllFuncoes().subscribe(val=> {
      console.log(val);
      for (let i = 0; i < val.length; i++)
      { 
        if(this.resultadoFuncoes.indexOf(val[i].nome) == -1)
          this.resultadoFuncoes.push(val[i].nome);
      }
    });
    
     
    console.log('Buscando funções');
    //this.resultadoFuncoes = ['Funcao 1', 'Funcao 2'];
}

  pesquisarSetor(event) {
    //this.resultadoSetores = this.cService.getAllSetoresContains(setor);
    console.log('buscando setores');
    this.resultadoSetores = ['Setor 1', 'Setor 2'];
}



  onSubmit(isValid: boolean, cargo: Cargo): void {
    isValid = true; //isso deveria já vir preenchido
    cargo.nome = cargo.funcao;
    if(this.idToEdit>0)
     cargo.id = this.idToEdit;
     else
     cargo.id = null;
     
     console.log('id cargo: ' + cargo.id);
     
    console.log('isValid', isValid);
    console.log('cargo', cargo);
    if (isValid) {
      cargo.servidore_id = 1; //procurar da onde está o id do servidor
this.cService.saveCargo(cargo).subscribe(ok =>{
  console.log('salvando', ok);
  this.closeModal();
})
    }
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    console.log('passou pelo hide');
    
    // Navega para a rota atual apenas alterando o parâmetro de exibição
    // this.router.navigate(['./', { show: false }], { skipLocationChange: true, relativeTo: this.activatedRoute })
  }
}
