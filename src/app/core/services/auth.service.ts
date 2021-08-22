import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from './api.service';

import { KEY_USER, dec, enc } from '@core/helpers';
import { User } from '@core/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser$: BehaviorSubject<User>;
  private apiPath = 'user/login';

  constructor(
    private apiService: ApiService,
  ) {
    let str = localStorage.getItem(`${KEY_USER}`);
    let user: User = str ? JSON.parse(dec(str)) : null;
    this._currentUser$ = new BehaviorSubject<User>(user);
  }

  public get currentUserValue(): User {
    return this._currentUser$.value;
  }

  public get currentUser$(): Observable<User> {
    return this._currentUser$.asObservable();
  }

  public updateCurrentUser(user: any): void {
    localStorage.setItem(`${KEY_USER}`, enc(JSON.stringify(user)));
    this._currentUser$.next(user);
  }

  login(email: string, password: string): Observable<User> {
    return this.apiService.post(this.apiPath, { email, password })
      .pipe(
        map((user: User) => {
          if (user) {
            localStorage.setItem(`${KEY_USER}`, enc(JSON.stringify(user)));
            this._currentUser$.next(user);
          }
          return user;
        })
      );
  }

  logout(): void {
    try {
      localStorage.removeItem(`${KEY_USER}`);
      this._currentUser$.next(null!);
      window.location.reload();
    } catch { }
  }
}
