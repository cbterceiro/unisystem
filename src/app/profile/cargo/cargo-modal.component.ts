import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
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
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  cargoForm: FormGroup;

  resultadoFuncoes: string[]; //resultado da pesquisa de funcoes
  resultadoSetores: string[]; //resultado da pesquisa de setores

  routeParamsSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cService: CargoService,
  ) { }

  ngOnInit() {
    // this.subscribeToRouteParams();
    this.setupForm();
  }

  subscribeToRouteParams(): void {
    // this.routeParamsSubscription = this.activatedRoute.params.subscribe(params => {
    //   console.log('params in CargoModalComponent', params);
    //   this.visible = params['show'] || false;
    // });
  }

  setupForm(): void {
    //this.setupDropdownOptions();


    this.cargoForm = this.formBuilder.group({
      funcao: ['', Validators.required],
      setor: ['', Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
    });
  }
  
  pesquisarFuncao(event) {
    //this.resultadoFuncoes = this.cService.getAllFuncoesContains(funcao);
    console.log('Buscando funções');
    this.resultadoFuncoes = ['Funcao 1', 'Funcao 2'];
}

  pesquisarSetor(event) {
    //this.resultadoSetores = this.cService.getAllSetoresContains(setor);
    console.log('buscando setores');
    this.resultadoSetores = ['Setor 1', 'Setor 2'];
}



  onSubmit(isValid: boolean, cargo: Cargo): void {
    console.log('isValid', isValid);
    console.log('cargo', cargo);
    if (isValid) {

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
