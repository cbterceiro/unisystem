import { Component, EventEmitter, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { Habilidade } from './habilidade.model';
import {HabilidadeService} from './habilidade.service'

@Component({
  selector: 'uns-habilidade-modal',
  templateUrl: 'habilidade-modal.component.html',
  styleUrls: ['habilidade-modal.component.css']
})
export class HabilidadeModalComponent implements OnInit {

  @Input() visible: boolean;
  @Input() habilidadeEdit: Habilidade;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  habilidadeForm: FormGroup;
  nome: string;
  numRecomendacoes: number;
  
  resultadoHabilidades: string[]; //resultado da pesquisa de funcoes
  resultadoSetores: string[]; //resultado da pesquisa de setores
  
  idToEdit:number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cService: HabilidadeService,
  ) { }

  ngOnInit() {
    // this.subscribeToRouteParams();
    this.setupForm();
    this.idToEdit = 0;
    console.log("passou init modal habilidade");
  }
  
  
  ngOnChanges(changes: SimpleChanges)
  {
    if(this.habilidadeEdit && this.visible)
    {
     console.log("habilidade: " + this.habilidadeEdit.id);
     console.log(this.habilidadeEdit.id);

     //descobrir forma de preencer a porcaria do calendar

     
     this.habilidadeForm = this.formBuilder.group({
      nome: [this.habilidadeEdit.nome, Validators.required],
      numRecomendacoes: [''],
    });

      this.idToEdit = this.habilidadeEdit.id;
    }
    else
    {
    this.setupForm();
    this.idToEdit = 0;
    }
  }



  setupForm(): void {
    //this.setupDropdownOptions();

console.log("passou setupform modal habilidade");

    this.habilidadeForm = this.formBuilder.group({
      nome: ['', Validators.required],
      numRecomendacoes: [''],
    });
  }
  
  pesquisarhabilidade(event) {
    //Verificar essa gamb
     let arrayHabilidades;
     if(!this.resultadoHabilidades)
      this.resultadoHabilidades = [];
    this.cService.getAllHabilidades().subscribe(val=> {
      console.log(val);
      for (let i = 0; i < val.length; i++)
      { 
        if(this.resultadoHabilidades.indexOf(val[i].nome) == -1)
          this.resultadoHabilidades.push(val[i].nome);
      }
    });
    
     
    console.log('Buscando habilidades');
    //this.resultadoHabilidades = ['habilidade 1', 'habilidade 2'];
}

  pesquisarSetor(event) {
    //this.resultadoSetores = this.cService.getAllSetoresContains(setor);
    console.log('buscando setores');
    this.resultadoSetores = ['Setor 1', 'Setor 2'];
}



  onSubmit(isValid: boolean, habilidade: Habilidade): void {
    isValid = true; //isso deveria já vir preenchido
  
    if(this.idToEdit>0)
     habilidade.id = this.idToEdit;
     else
     habilidade.id = null;
     
     console.log('id habilidade: ' + habilidade.id);
     
    console.log('isValid', isValid);
    console.log('habilidade', habilidade);
    if (isValid) {
      habilidade.servidor_id = 1; //procurar da onde está o id do servidor
this.cService.savehabilidade(habilidade).subscribe(ok =>{
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
