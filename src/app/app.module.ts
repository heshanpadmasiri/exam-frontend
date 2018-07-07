import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TokenInterceptor} from './services/token.interceptor';
import {AuthGuard} from './guards/auth.guard';
import {ResultsComponent} from './components/results/results.component';
import {UserServicesService} from './services/user-services.service';
import {RegisterToModuleComponent} from './components/register-to-module/register-to-module.component';
import {ReCorrectionComponent} from './components/re-correction/re-correction.component';
import {EnterResultsComponent} from './enter-results/enter-results.component';
import {ModuleService} from './services/module.service';
import { ExamResultsService } from './services/exam-results.service';
import {CreateModuleComponent} from './components/create-module/create-module.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FilesComponent } from './files/files.component';

// routes
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'results', component: ResultsComponent, canActivate: [AuthGuard]},
  {path: 'register-module', component: RegisterToModuleComponent, canActivate: [AuthGuard]},
  {path: 're-correction', component: ReCorrectionComponent, canActivate: [AuthGuard]},
  {path: 'create-module', component: CreateModuleComponent, canActivate: [AuthGuard]},
  {path: 'upload-file', component: FileUploadComponent, canActivate: [AuthGuard]},
  {path: 'files', component: FilesComponent, canActivate: [AuthGuard]},
  {path: 'enter-results', component: EnterResultsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ResultsComponent,
    RegisterToModuleComponent,
    ReCorrectionComponent,
    EnterResultsComponent,
    CreateModuleComponent,
    FileUploadComponent,
    FilesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBzZJBsIqkrDXhU1IY-QNcFtVQn-as-DcM',
      authDomain: 'examination-system-cd948.firebaseapp.com',
      databaseURL: 'https://examination-system-cd948.firebaseio.com',
      projectId: 'examination-system-cd948',
      storageBucket: 'examination-system-cd948.appspot.com',
      messagingSenderId: '17375303111'
    }),
    AngularFireStorageModule
  ],
  providers: [
    ValidateService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard,
    UserServicesService,
    ModuleService,
	ExamResultsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
