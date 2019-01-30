import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FormService } from './../../services/form.service';
import { AuthApiService } from './../../services/auth-api.service';
import { AuthInterceptor } from './../../interceptors/auth-interceptor';
import { SharedModule } from '../shared/components/shared.module';
import { QuestionnaireApiService } from '../../services/questionnaire-api.service';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './components/form/form.component';
import { PlanApiService } from '../../services/plan-api.service';
import { CommonModule } from '@angular/common';
import { QuestionnaireEventsService } from '../../services/questionnaire-events.service';

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ConfirmComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    }),
    SweetAlert2Module.forRoot(),
    PerfectScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    NgxMaskModule.forRoot(),
    NgxSmartModalModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [ PerfectScrollbarModule, TranslateModule ],
  providers: [
    FormService,
    AuthApiService,
    QuestionnaireApiService,
    PlanApiService,
    QuestionnaireEventsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
