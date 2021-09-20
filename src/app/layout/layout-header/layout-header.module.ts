import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbPopoverModule,
} from '@nebular/theme';

import { DirectivesModule } from '@shared/directives';


import { LayoutHeaderComponent } from './layout-header.component';


@NgModule({
  declarations: [
    LayoutHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NbButtonModule,
    NbPopoverModule,
    NbCardModule,
    NbListModule,
    DirectivesModule,
  ],
  exports: [
    LayoutHeaderComponent,
  ]
})
export class LayoutHeaderModule { }
