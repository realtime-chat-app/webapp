import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormControlStatusDirective } from './form-control-status.directive';
import { LazyLoadImageDirective } from './lazy-load-image.directive';


@NgModule({
  declarations: [
    FormControlStatusDirective,
    LazyLoadImageDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormControlStatusDirective,
    LazyLoadImageDirective,
  ]
})
export class DirectivesModule { }
