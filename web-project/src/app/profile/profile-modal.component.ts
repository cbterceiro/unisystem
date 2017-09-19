import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'uns-profile-modal',
  templateUrl: 'profile-modal.component.html',
  styleUrls: ['profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {

  visible: boolean;
  profileForm: FormGroup;
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

  closeModal(): void {
    this.visible = false;
    // Navega para a rota atual apenas alterando o parâmetro de exibição
    this.router.navigate(['./', { show: false }], { skipLocationChange: true, relativeTo: this.activatedRoute })
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
