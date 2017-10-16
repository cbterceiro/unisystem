import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ConfirmationService } from 'primeng/primeng';

import { AuthenticationService } from './authentication.service';

import { ServidorService, Servidor } from '../core';

interface LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'uns-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginErrorMessage: string;
  isSubmitting: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private servidorService: ServidorService,
    private fb: FormBuilder,
    private router: Router,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  onSubmit(loginModel: LoginModel): void {
    this.isSubmitting = true;
    this.authenticationService.login(loginModel.email, loginModel.password).subscribe(servidor => {
      if (servidor) {
        this.isSubmitting = false;
        this.router.navigate(['']);
      } else {
        this.confirmationService.confirm({
          message: `Não foi encontrado usuário no banco com o email [${loginModel.email}]. Deseja cadastrá-lo neste momento?`,
          accept: () => {
            const servidor = new Servidor();
            servidor.email = loginModel.email;
            this.servidorService.save(servidor).subscribe(success => {
              this.isSubmitting = false;
              this.router.navigate(['']);
            }, error => {
              this.loginErrorMessage = error.json().msg;
            });
          },
        });
      }
    }, error => {
      this.loginErrorMessage = error;
    });
  }
}
