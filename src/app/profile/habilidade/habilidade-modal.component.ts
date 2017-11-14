import { Component, EventEmitter, OnInit, Input, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';
import {ChipsModule} from 'primeng/primeng';

import { AuthenticatedUserService } from '../../authentication';
import { MessageService } from '../../core';

import { Habilidade } from './habilidade.model';
import { HabilidadeService } from './habilidade.service'

@Component({
  selector: 'uns-habilidade-modal',
  templateUrl: 'habilidade-modal.component.html',
  styleUrls: ['habilidade-modal.component.css']
})
export class HabilidadeModalComponent implements OnInit {

  @Input() visible: boolean;
  @Input() habilidadeEdit: Habilidade;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();


  habilidadeForm: FormGroup;
  nome: string;
  numRecomendacoes: number;

  resultadoHabilidades: string[]; //resultado da pesquisa de habilidades
  resultadosHabilidades: Habilidade[]; //resultado da pesquisa de habilidades

  idToEdit: number;

  isSubmitting: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cService: HabilidadeService,
    private authenticatedUserService: AuthenticatedUserService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.setupForm();
    this.idToEdit = 0;
    console.log("passou init modal habilidade");
  }


  ngOnChanges(changes: SimpleChanges) {
    if (this.habilidadeEdit && this.visible) {
      console.log("habilidade: " + this.habilidadeEdit.id);
      console.log(this.habilidadeEdit.id);
      this.habilidadeForm = this.formBuilder.group({
        nome: [this.habilidadeEdit.nome, Validators.required],
        numRecomendacoes: [''],
      });

      this.idToEdit = this.habilidadeEdit.id;
    }
    else {
      this.setupForm();
      this.idToEdit = 0;
    }
  }



  setupForm(): void {
    console.log("passou setupform modal habilidade");
    this.habilidadeForm = this.formBuilder.group({
      nome: ['', Validators.required],
      numRecomendacoes: [''],
    });
  }

  pesquisarhabilidades(event): void {
    this.cService.searchHabilidades(event.query).subscribe(habilidades => {
      this.resultadosHabilidades = habilidades;
    });
  }

  pesquisarhabilidade(event) {
    //Verificar essa gamb
    let arrayHabilidades;
    if (!this.resultadoHabilidades)
      this.resultadoHabilidades = [];
    this.cService.getAllHabilidades().subscribe(val => {
      console.log(val);
      for (let i = 0; i < val.length; i++) {
        if (this.resultadoHabilidades.indexOf(val[i].nome) == -1)
          this.resultadoHabilidades.push(val[i].nome);
      }
    });
    console.log('Buscando habilidades');
  }

  pesquisarSetor(event) {
    //this.resultadoSetores = this.cService.getAllSetoresContains(setor);
    console.log('buscando setores');
    this.resultadoHabilidades = ['Setor 1', 'Setor 2'];
  }

  onSubmit(isValid: boolean, habilidade: Habilidade): void {
    isValid = true; //isso deveria já vir preenchido
    if (this.idToEdit > 0)
      habilidade.id = this.idToEdit;
    else
      habilidade.id = null;
    console.log('id habilidade: ' + habilidade.id);
    console.log('isValid', isValid);
    console.log('habilidade', habilidade);
    if (isValid) {
      const servidor = this.authenticatedUserService.getServidor();
      habilidade.servidor_id = servidor.id;
      this.cService.savehabilidade(habilidade).subscribe(ok => {
        this.isSubmitting = false;
        this.messageService.sendSuccess({ detail: 'Habilidade atualizada com sucesso.' });
        this.onSave.emit(true);
        this.closeModal();
      })
    }
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
