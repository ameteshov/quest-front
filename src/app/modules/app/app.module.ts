import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserModule } from '../user/user.module';
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

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}

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
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    }),
    SweetAlert2Module.forRoot(),
    AppRoutingModule,
    SharedModule
  ],
  exports: [],
  providers: [
    FormService,
    AuthApiService,
    QuestionnaireApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
