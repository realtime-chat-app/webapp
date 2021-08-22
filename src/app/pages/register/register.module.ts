import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
} from '@nebular/theme';

import { RegisterRoutingModule } from './register-routing.module';
import { DirectivesModule } from '@shared/directives';
import { ButtonsModule } from '@shared/buttons';

import { RegisterComponent } from './register.component';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterRoutingModule,
    FormsModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    DirectivesModule,
    ButtonsModule,
  ]
})
export class RegisterModule { }
