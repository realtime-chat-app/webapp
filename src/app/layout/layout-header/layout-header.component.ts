import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from '@core/services';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }
}
