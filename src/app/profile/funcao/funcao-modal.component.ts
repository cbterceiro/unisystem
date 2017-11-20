import { Component, EventEmitter, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { AuthenticatedUserService } from '../../authentication';

import { MessageService , ModelId } from '../../core';

import { markFormGroupDirty } from '../../shared/functions';

import { Funcao } from './funcao.model';
import { FuncaoService } from './funcao.service';

@Component({
  selector: 'uns-funcao-modal',
  templateUrl: 'funcao-modal.component.html',
  styleUrls: ['funcao-modal.component.css']
})
export class FuncaoModalComponent implements OnChanges {

  @Input() visible: boolean;
  @Input() funcaoEdit: Funcao;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();

  title: string;

  funcaoForm: FormGroup;

  sugestoesFuncao: string[];
  sugestoesSetor: string[];
  sugestoesOrgao: ModelId[];
  atualChecked: boolean;

  idToEdit: number;

  isSubmitting: boolean;
  orgaoModel: ModelId;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private funcaoService: FuncaoService,
    private authenticatedUserService: AuthenticatedUserService,
    private messageService: MessageService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.funcaoEdit && this.visible) {
      this.funcaoForm = this.formBuilder.group({
        nome: [this.funcaoEdit.nome, Validators.required],
        setor: [null], // terá setor aqui?
        orgao_id: [this.funcaoEdit.orgao.id],
        atual: [this.funcaoEdit.atual],
        descricao: [this.funcaoEdit.descricao],
        dataInicio: [this.funcaoEdit.dataInicio, Validators.required],
        dataFim: [this.funcaoEdit.dataFim, Validators.required],
      });

      this.idToEdit = this.funcaoEdit.id;
      this.title = 'Editar informações de função';
    } else {
      this.funcaoForm = this.formBuilder.group({
        nome: ['', Validators.required],
        setor: [''],
        orgao_id: null,
        atual: [false],
        descricao: [''],
        dataInicio: [null, Validators.required],
        dataFim: [null, Validators.required],
      });

      this.funcaoForm.get('atual')
          .valueChanges
          .subscribe(value => this.handleChange(value));
      this.idToEdit = null;
      this.title = 'Adicionar informações de função';
    }

    this.orgaoModel = new ModelId();
  }

  pesquisarFuncao(event) {
    const nomeFuncao = event.query;
    this.funcaoService.searchFuncoesCadastradas(nomeFuncao).subscribe(funcoes => {
      this.sugestoesFuncao = funcoes;
    });
  }

  pesquisarOrgao(event) {
    const nomeOrgao = event.query;
    this.funcaoService.searchOrgaos(nomeOrgao).subscribe(orgao => {
      this.sugestoesOrgao = orgao;
    });
  }
  pesquisarSetor(event) {
    const nomeSetor = event.query;
    // buscar no backend os setores
    this.sugestoesSetor = ['Setor 1', 'Setor 2'];
  }
  
  handleChange(value: boolean) {
    let dataFinalForm = this.funcaoForm.get('dataFim');
    console.log(dataFinalForm);
    
    if (value) {
      this.atualChecked = true;
      dataFinalForm.setValue(null, {onlySelf: true});
      dataFinalForm.clearValidators();
      dataFinalForm.updateValueAndValidity();
     // dataFinalForm.enabled();
    } else {
      this.atualChecked = false;
      dataFinalForm.setValidators(Validators.required);
      dataFinalForm.updateValueAndValidity();
      // dataFinalForm.disable();
    }
  }

  onSubmit(isValid: boolean, funcao: Funcao): void {
    if (isValid) {
      const servidor = this.authenticatedUserService.getServidor();
      funcao.id = this.idToEdit;
      funcao.servidor_id = servidor.id;
      this.isSubmitting = true;
      this.funcaoService.save(funcao).subscribe(success => {
        this.isSubmitting = false;
        this.messageService.sendSuccess({ detail: 'Função atualizada com sucesso.' });
        this.onSave.emit(true);
        this.closeModal();
      });
    } else {
      markFormGroupDirty(this.funcaoForm);
    }
  }

  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
