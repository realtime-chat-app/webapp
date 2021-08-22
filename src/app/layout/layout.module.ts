import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NbLayoutModule, NbSpinnerModule } from '@nebular/theme';

import { LayoutHeaderModule } from './layout-header';
import { LayoutFooterModule } from './layout-footer';

import { LayoutComponent } from './components/layout.component';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutHeaderModule,
    LayoutFooterModule,
    NbLayoutModule,
    RouterModule,
    NbSpinnerModule,
  ],
  exports: [
    LayoutHeaderModule,
    LayoutFooterModule,
    LayoutComponent,
  ]
})
export class LayoutModule { }
