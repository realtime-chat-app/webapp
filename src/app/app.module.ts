import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';

import {
  NbDialogModule,
  NbLayoutModule,
  NbMenuModule,
  NbThemeModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@layout/layout.module';
import { CoreModule } from '@core/core.module';

import { JwtInterceptor } from '@core/interceptors';

import { AppComponent } from './app.component';

import { metaReducers, reducers } from '@store/reducers';
import { ChatEffectsService } from '@pages/chat/store';

import { environment } from '@environment/environment';

registerLocaleData(localePt);

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule,
    NbLayoutModule,
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    CoreModule,
    LayoutModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([ChatEffectsService]),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
