import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ToastService } from '@shared/services';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-login-',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  public get controls(): { [key: string]: AbstractControl; } {
    return this.form.controls;
  }

  public showPassword = false;
  public loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private service: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(take(1)).subscribe(params => {
      if (params.email) {
        const control = this.controls.email;
        control.setValue(params.email);
      }
    });
  }

  public submit() {
    if (this.form.valid) {
      this.loading = true;
      const { email, password } = this.form.value;
      this.service.login(email, password)
        .pipe(
          take(1),
          catchError(err => {
            this.loading = false;
            this.displayErrorMessage(err);
            return throwError(err);
          })
        )
        .subscribe(user => {
          this.loading = false;
          this.toastService.displayToast(
            `Bem vindo ${user.name}!`,
            `Pesquise pelos seus pratos favoritos e bom apetite`,
            'success'
          );
          this.router.navigate(['chat']);
        });
    };
  }

  private displayErrorMessage(error: any): void {
    let title = 'Desculpe, não foi possível efetuar o login';
    let message = 'Erro desconhecido';
    let errMsg: string = error.error.message.toLocaleLowerCase();

    if (errMsg.includes('user not found')) {
      title = 'Usuário não encontrado';
      message = 'E-mail ou senha inválidos';
    }
    else if (errMsg.includes('invalid password')) {
      title = 'Senha inválida';
      message = 'Verifique sua senha e tente novamente';
    }

    this.toastService.displayToast(title, message, 'danger', true);
  }
}
