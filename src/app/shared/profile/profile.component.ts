import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NbToastrService, NbWindowRef } from '@nebular/theme';

import { BehaviorSubject, merge, Observable, of, throwError } from 'rxjs';
import { catchError, map, mapTo, take } from 'rxjs/operators';
import * as moment from 'moment';

import { AuthService, UserService } from '@core/services';

import { User } from '@core/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {

  public loading$ = new BehaviorSubject<boolean>(false);
  public user: User | null = null;
  public form: FormGroup | null = null;
  public disableFormBtn$: Observable<boolean> | null = null;

  public get controls(): { [key: string]: FormControl; } {
    return this.form?.controls as { [key: string]: FormControl; };
  }

  constructor(
    private toastService: NbToastrService,
    private authService: AuthService,
    private modalRef: NbWindowRef,
    private service: UserService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.user?.id, [Validators.required]),
      name: new FormControl(this.user?.name, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required]),
      avatar: new FormControl(this.user?.avatar),
    });

    this.disableFormBtn$ = this.getDisableFormBtn();
  }

  public submit() {
    if (this.form?.valid) {
      this.loading$.asObservable()
        .pipe(take(1))
        .toPromise()
        .then((isLoading) => {
          if (!isLoading) {
            this.loading$.next(true);
            this.service.UpdateUser(this.form?.value)
              .pipe(
                take(1),
                catchError(err => {
                  this.loading$.next(false);
                  this.displayErrorMessage(err);
                  return throwError(err);
                })
              )
              .subscribe(() => {
                this.loading$.next(false);
                this.displayToast(
                  'Dados atualizados com sucesso',
                  '',
                  'success',
                  false
                );
                const updatedUser = new User({
                  ...this.user,
                  ...this.form?.value,
                });
                this.authService.updateCurrentUser(updatedUser);
                this.modalRef.close();
              });
          }
        });
    };
  }

  private getDisableFormBtn() {
    const valueChanges$ = this.form?.valueChanges as Observable<any>;
    const src$ = of(false);
    return merge(
      src$.pipe(mapTo('initial emission')),
      valueChanges$,
    )
      .pipe(
        map((user: User | string) => {
          if (typeof user === 'string' || this.form?.pristine) {
            return true;
          }

          return !this.form?.valid;
        }),
      );
  }

  private displayErrorMessage(error: any) {
    let title = '';
    let message = '';
    switch (error) {
      case 'Usuário não encontrado.':
        title = 'Usuário não encontrado';
        message = 'Credenciais inválidas ou usário inexistente';
        break;

      default:
        title = 'Desculpe, não foi possível atualizar os dados';
        message = 'Erro desconhecido';

        break;
    }

    this.displayToast(title, message);
  }

  private displayToast(title: string, message: string, status = 'danger', showMessage = true) {
    this.toastService.show(
      message,
      title,
      ({
        position: 'top-right',
        status: status,
        toastClass: showMessage === false ? 'toast-without-message' : '',
      } as any),
    );
  }
}
