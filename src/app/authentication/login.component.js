"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("../core");
var LoginComponent = (function () {
    function LoginComponent(authenticationService, servidorService, fb, router, confirmationService) {
        this.authenticationService = authenticationService;
        this.servidorService = servidorService;
        this.fb = fb;
        this.router = router;
        this.confirmationService = confirmationService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.fb.group({
            email: ['', forms_1.Validators.email],
            password: ['', forms_1.Validators.required]
        });
    };
    LoginComponent.prototype.onSubmit = function (loginModel) {
        var _this = this;
        this.isSubmitting = true;
        this.authenticationService.login(loginModel.email, loginModel.password).subscribe(function (servidor) {
            if (servidor) {
                _this.isSubmitting = false;
                _this.router.navigate(['']);
            }
            else {
                _this.confirmationService.confirm({
                    message: "N\u00E3o foi encontrado usu\u00E1rio no banco com o email [" + loginModel.email + "]. Deseja cadastr\u00E1-lo neste momento?",
                    accept: function () {
                        var servidor = new core_2.Servidor();
                        servidor.email = loginModel.email;
                        _this.servidorService.save(servidor).subscribe(function (success) {
                            _this.isSubmitting = false;
                            _this.router.navigate(['']);
                        }, function (error) {
                            _this.loginErrorMessage = error.json().msg;
                        });
                    }
                });
            }
        }, function (error) {
            _this.loginErrorMessage = error;
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'uns-login',
        templateUrl: 'login.component.html',
        styleUrls: ['login.component.css']
    })
], LoginComponent);
exports.LoginComponent = LoginComponent;
