import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbBadgeModule, NbButtonModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';

import {
  PrimaryOutlineBtnComponent,
} from './components';

@NgModule({
  declarations: [
    PrimaryOutlineBtnComponent,
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    NbBadgeModule,
  ],
  exports: [
    PrimaryOutlineBtnComponent,
  ]
})
export class ButtonsModule { }
