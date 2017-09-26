import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { Cargo } from './cargo.model';

@Component({
  selector: 'uns-cargo-modal',
  templateUrl: 'cargo-modal.component.html',
  styleUrls: ['cargo-modal.component.css']
})
export class CargoModalComponent implements OnInit {

  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


  cargoForm: FormGroup;

  funcaoStatus: SelectItem[];
  setorStatus: SelectItem[];

  routeParamsSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
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
    this.setupDropdownOptions();

    // this.cargoImageSource = '/assets/img/default-user-icon.png';

    this.cargoForm = this.formBuilder.group({
      funcao: ['', Validators.required],
      setor: ['', Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
    });
  }

  setupDropdownOptions(): void {
    this.funcaoStatus = [
      { label: '  ---Escolha uma Função---  ', value: null },
    ];
    this.setorStatus = [
      { label: '  ---Escolha um Setor---  ', value: null},
    ];
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
