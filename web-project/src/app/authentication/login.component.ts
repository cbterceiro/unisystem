import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

interface LoginModel {
  username: string;
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

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(loginModel: LoginModel): void {
    if (this.authenticationService.login(loginModel.username, loginModel.password)) {
      this.router.navigate(['dashboard']);
    } else {
      this.loginErrorMessage = 'Usuário ou senha inválidos.';
    }
  }
}
