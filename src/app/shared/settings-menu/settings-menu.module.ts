import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NbCardModule, NbContextMenuModule, NbIconModule, NbUserModule } from '@nebular/theme';

import { ButtonsModule } from '@shared/buttons';

import { SettingsMenuComponent } from './settings-menu.component';


@NgModule({
  declarations: [
    SettingsMenuComponent,
  ],
  imports: [
    CommonModule,
    NbContextMenuModule,
    NbUserModule,
    NbCardModule,
    NbIconModule,
    ButtonsModule,
  ],
  exports: [
    SettingsMenuComponent,
  ]
})
export class SettingsMenuModule { }
