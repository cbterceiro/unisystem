import { Component, EventEmitter, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { Funcao } from './funcao.model';
import {FuncaoService} from './funcao.service'

@Component({
  selector: 'uns-funcao-modal',
  templateUrl: 'funcao-modal.component.html',
  styleUrls: ['funcao-modal.component.css']
})
export class FuncaoModalComponent implements OnInit {

  @Input() visible: boolean;
  @Input() funcaoEdit: Funcao;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  funcaoForm: FormGroup;
  dataInicio: Date;
  dataFim: Date;
  nome: string;
  descricao: string;
  
  resultadoFuncoes: string[]; //resultado da pesquisa de funcoes
  resultadoSetores: string[]; //resultado da pesquisa de setores
  
  idToEdit:number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cService: FuncaoService,
  ) { }

  ngOnInit() {
    // this.subscribeToRouteParams();
    this.setupForm();
    this.idToEdit = 0;
    console.log("passou init modal funcao");
  }
  
  
  ngOnChanges(changes: SimpleChanges)
  {
    if(this.funcaoEdit && this.visible)
    {
     console.log("funcao: " + this.funcaoEdit.dataInicio);
     console.log(this.funcaoEdit.dataInicio);

     //descobrir forma de preencer a porcaria do calendar

     
     this.funcaoForm = this.formBuilder.group({
      nome: [this.funcaoEdit.nome, Validators.required],
      setor: [''],
      descricao: [''], 
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
    });

      this.idToEdit = this.funcaoEdit.id;
    }
    else
    {
    this.setupForm();
    this.idToEdit = 0;
    }
  }



  setupForm(): void {
    //this.setupDropdownOptions();

console.log("passou setupform modal funcao");

    this.funcaoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      setor: [''],
      descricao: [''],
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



  onSubmit(isValid: boolean, funcao: Funcao): void {
    isValid = true; //isso deveria já vir preenchido
  
    if(this.idToEdit>0)
     funcao.id = this.idToEdit;
     else
     funcao.id = null;
     
     console.log('id funcao: ' + funcao.id);
     
    console.log('isValid', isValid);
    console.log('funcao', funcao);
    if (isValid) {
      funcao.servidor_id = 1; //procurar da onde está o id do servidor
this.cService.saveFuncao(funcao).subscribe(ok =>{
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
