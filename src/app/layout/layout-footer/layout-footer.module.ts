import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbIconModule } from '@nebular/theme';

import { LayoutFooterComponent } from './layout-footer.component';


@NgModule({
  declarations: [
    LayoutFooterComponent
  ],
  imports: [
    CommonModule,
    NbIconModule,
  ],
  exports: [LayoutFooterComponent]
})
export class LayoutFooterModule { }
