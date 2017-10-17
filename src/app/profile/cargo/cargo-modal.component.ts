import { Component, EventEmitter, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { AuthenticatedUserService } from '../../authentication';

import { MessageService } from '../../core';

import { markFormGroupDirty } from '../../shared/functions';

import { Cargo } from './cargo.model';
import { CargoService } from './cargo.service';

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
  sugestoesSetor: string[];

  idToEdit: number;

  isSubmitting: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cargoService: CargoService,
    private authenticatedUserService: AuthenticatedUserService,
    private messageService: MessageService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.cargoEdit && this.visible) {
      this.cargoForm = this.formBuilder.group({
        nome: [this.cargoEdit.nome, Validators.required],
        setor: [this.cargoEdit.setor],
        dataInicio: [this.cargoEdit.dataInicio, Validators.required],
        dataFim: [this.cargoEdit.dataFim, Validators.required],
      });

      this.idToEdit = this.cargoEdit.id;
      this.title = 'Editar informações de cargo';
    } else {
      this.cargoForm = this.formBuilder.group({
        nome: ['', Validators.required],
        setor: [''],
        dataInicio: [null, Validators.required],
        dataFim: [null, Validators.required],
      });

      this.idToEdit = null;
      this.title = 'Adicionar informações de cargo';
    }
  }

  pesquisarCargo(event) {
    const nomeCargo = event.query;
    this.cargoService.searchCargos(nomeCargo).subscribe(cargos => {
      this.sugestoesCargo = cargos;
    });
  }

  pesquisarSetor(event) {
    const nomeSetor = event.query;
    // buscar no backend os setores
    this.sugestoesSetor = ['Setor 1', 'Setor 2'];
  }

  onSubmit(isValid: boolean, cargo: Cargo): void {
    if (isValid) {
      const servidor = this.authenticatedUserService.getServidor();
      cargo.id = this.idToEdit;
      cargo.servidor_id = servidor.id;
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
