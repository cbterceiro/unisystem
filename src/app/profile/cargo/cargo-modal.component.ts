import { Component, EventEmitter, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { AuthenticatedUserService } from '../../authentication';

import { MessageService, ModelId } from '../../core';

import { markFormGroupDirty } from '../../shared/functions';

import { Cargo } from './cargo.model';
import { CargoService } from './cargo.service';
import { FuncaoService } from '../funcao/funcao.service';

@Component({
  selector: 'uns-cargo-modal',
  templateUrl: 'cargo-modal.component.html',
  styleUrls: ['cargo-modal.component.css']
})
export class CargoModalComponent implements OnChanges {

  @Input() visible: boolean;
  @Input() cargoEdit: Cargo;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();

  title: string;

  cargoForm: FormGroup;

  sugestoesCargo: string[];
  sugestoesOrgao: ModelId[];
  sugestoesSetores: string[];
  idToEdit: number;
  atualChecked: boolean;

  isSubmitting: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cargoService: CargoService,
    private funcaoService: FuncaoService,
    private authenticatedUserService: AuthenticatedUserService,
    private messageService: MessageService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.cargoEdit && this.visible) {
      this.cargoForm = this.formBuilder.group({
        nome: [this.cargoEdit.nome, Validators.required],
        orgao: [this.cargoEdit.orgao],
        setor: [this.cargoEdit.setor],
        orgao_id: [this.cargoEdit.orgao.id],
        atual: [this.cargoEdit.atual],
        dataInicio: [this.cargoEdit.dataInicio, Validators.required],
        dataFim: [this.cargoEdit.dataFim, Validators.required],
      });

      this.atualChecked = this.cargoEdit.atual;
      this.idToEdit = this.cargoEdit.id;
      this.title = 'Editar informações de cargo';
    } else {
      this.atualChecked = false;
      this.cargoForm = this.formBuilder.group({
        nome: ['', Validators.required],
        setor: ['', Validators.required],
        orgao: [null, Validators.required],
        orgao_id: null,
        atual: [false],
        dataInicio: [null, Validators.required],
        dataFim: [null, Validators.required],
      });

      this.idToEdit = null;
      this.title = 'Adicionar informações de cargo';
    }

    this.cargoForm.get('atual')
      .valueChanges
      .subscribe(value => this.handleChange(value));
  }

  pesquisarCargo(event) {
    const nomeCargo = event.query;
    this.cargoService.searchCargosCadastrados(nomeCargo).subscribe(cargos => {
      this.sugestoesCargo = cargos;
    });
  }

  pesquisarOrgao(event) {
    const nomeOrgao = event.query;
    this.funcaoService.searchOrgaos(nomeOrgao).subscribe(orgao => {
      this.sugestoesOrgao = orgao;
    });
  }

  pesquisarSetor(event) {
    // const nomeOrgao = event.query;
    // // buscar no backend os setores
    // this.sugestoesOrgao = ['Setor 1', 'Setor 2'];
  }

  cbAtualCkick(cargo: Cargo) {
    // this.cargoForm.controls['atual'].value
    // console.log((cargo.atual == true ? 'true' : 'false'));
    //console.log(this.cargoForm.controls['atual'].value);
  }

  handleChange(value: boolean) {
    let dataFinalForm = this.cargoForm.get('dataFim');

    if (value) {
      this.atualChecked = true;
      dataFinalForm.setValue(null, { onlySelf: true });
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

  onSubmit(isValid: boolean, cargo: Cargo): void {
    if (isValid) {
      const servidor = this.authenticatedUserService.getServidor();
      cargo.id = this.idToEdit;
      cargo.servidor_id = servidor.id;
      cargo.orgao_id = cargo.orgao.id;
      cargo.setor_id = cargo.setor.id;
      this.isSubmitting = true;
      this.cargoService.save(cargo).subscribe(success => {
        this.isSubmitting = false;
        this.messageService.sendSuccess({ detail: 'Cargo atualizado com sucesso.' });
        this.onSave.emit(true);
        this.closeModal();
      });
    } else {
      markFormGroupDirty(this.cargoForm);
    }
  }


  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
