import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { ApiService } from './api.service';

import { User } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authService: AuthService,
    private api: ApiService,
  ) { }

  public GetUsers(config?: { removeSelf: boolean }): Observable<User[]> {
    return this.api.get('user')
      .pipe(
        map((users: User[]) => {
          if (config?.removeSelf) {
            return users
              .filter(u => u.id != this.authService.currentUserValue.id)
              .sort((a, b) => a.name.localeCompare(b.name));
          } else {
            return users
              .sort((a, b) => a.name.localeCompare(b.name));
          }
        })
      );
  }

  public UpdateUser(user: User): Observable<number> {
    return this.api.put('user', user);
  }
}
