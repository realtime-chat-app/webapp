import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '@core/services';

import { User } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private path = 'user';

  constructor(private api: ApiService) { }

  public RegisterUser(user: User): Observable<User> {
    return this.api.post(this.path, user);
  }
}
