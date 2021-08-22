import { Component } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '@core/services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  public loading$ = new BehaviorSubject(false);
  public userIsLoggedIn$: Observable<boolean>;

  constructor(
    public authService: AuthService,
  ) {
    this.userIsLoggedIn$ = this.authService.currentUser$
      .pipe(
        map(user => {
          if (user) return true;
          else return false;
        })
      );
  }
}
