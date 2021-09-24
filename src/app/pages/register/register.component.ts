import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { RegisterService } from './register.service';
import { ToastService } from '@shared/services';

import { mustMatchValidator } from '@core/helpers/reactive-forms-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    confirm: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
  }, { validators: mustMatchValidator('password', 'confirm') });
  public get controls(): { [key: string]: AbstractControl; } {
    return this.form.controls;
  }

  public showPassword = false;
  public loading = false;
  public registered = false;

  constructor(
    private toastService: ToastService,
    private service: RegisterService,
    private router: Router,
  ) { }

  public submit() {
    if (this.form.valid) {
      this.loading = true;
      this.service.RegisterUser(this.form.value)
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
          this.registered = true;
          this.toastService.displayToast(
            `Parabéns, ${user.name}!`,
            `Conta criada com sucesso. Agora é só fazer login e curtir um bate papo em tempo real :)`,
            'success'
          );
          setTimeout(() => {
            this.router.navigate(['login'], { queryParams: { email: user.email } });
          }, 1500);
        });
    };
  }

  private displayErrorMessage(error: any): void {
    let title = 'Desculpe, não foi possível efetuar o registro';
    let message = 'Erro desconhecido';
    let errMsg = error.error.message.toLocaleLowerCase();

    if (errMsg.includes('is already taken')) {
      title = 'Este endereço de e-mail já está em uso';
      message = 'Tente outro endereço de e-mail';
    }

    this.toastService.displayToast(title, message, 'danger', true);
  }
}
