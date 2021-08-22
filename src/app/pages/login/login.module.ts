import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule } from '@nebular/theme';

import { LoginRoutingModule } from './login-routing.module';
import { DirectivesModule } from '@shared/directives';
import { ButtonsModule } from '@shared/buttons';

import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
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
export class LoginModule { }
