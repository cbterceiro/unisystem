import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { Profile } from './profile.model';

@Component({
  selector: 'uns-profile-modal',
  templateUrl: 'profile-modal.component.html',
  styleUrls: ['profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {

  visible: boolean;

  profileForm: FormGroup;
  profileImageSource: string;

  maritalStatuses: SelectItem[];
  nationalities: SelectItem[];
  states: SelectItem[];

  routeParamsSubscription: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.subscribeToRouteParams();
    this.setupForm();
  }

  subscribeToRouteParams(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(params => {
      console.log('params in ProfileModalComponent', params);
      this.visible = params['show'] || false;
    });
  }

  setupForm(): void {
    this.setupDropdownOptions();

    this.profileImageSource = '/assets/img/default-user-icon.png';

    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthDate: [null, Validators.required],
      sex: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      functionalNumber: [null, Validators.required],
      nationality: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required],
    });
  }

  setupDropdownOptions(): void {
    this.maritalStatuses = [
      { label: 'Selecione um estado civil', value: null },
      { label: 'Solteiro (a)', value: 'Solteiro' },
      { label: 'Casado (a)', value: 'Casado' },
      { label: 'Divorciado (a)', value: 'Divorciado' },
      { label: 'Viúvo (a)', value: 'Viúvo' },
      { label: 'Separado (a)', value: 'Separado' },
    ];
    this.nationalities = [
      { label: 'Brasileiro', value: 'BR' },
    ];
    this.states = [
      { label: 'ES', value: 'ES' },
    ];
  }

  onSubmit(isValid: boolean, profile: Profile): void {
    console.log('isValid', isValid);
    console.log('profile', profile);
    if (isValid) {

    }
  }

  closeModal(): void {
    this.visible = false;
    // Navega para a rota atual apenas alterando o parâmetro de exibição
    this.router.navigate(['./', { show: false }], { skipLocationChange: true, relativeTo: this.activatedRoute })
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
