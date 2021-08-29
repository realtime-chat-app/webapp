import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbFormFieldModule, NbIconModule, NbInputModule, NbSpinnerModule, NbUserModule } from '@nebular/theme';

import { NgxMaskModule } from 'ngx-mask';

import { DirectivesModule } from '@shared/directives';
import { ButtonsModule } from '@shared/buttons';

import { ProfileComponent } from './profile.component';


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule,
    ButtonsModule,
    DirectivesModule,
    NbSpinnerModule,
    NbInputModule,
    NbFormFieldModule,
    NbUserModule,
    NbIconModule,
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
