import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { AuthenticationService } from "./services/authentication.service";
import { authInterceptorProviders } from "./services/auth.interceptor";
import { AuthServiceService } from './services/auth-service.service';
import { UserServiceService } from './services/user-service.service';
import { PretService } from "./services/pret.service";
import { TokenStorageService } from './services/token-storage.service';
import { EmailService } from "./services/email.service";
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EmployesComponent } from './components/employes/employes.component';
import { EmployeDetailsComponent } from './components/employe-details/employe-details.component';
import { PretsComponent } from './components/prets/prets.component';
import { PretDetailsComponent } from './components/pret-details/pret-details.component';
import { FooterComponent } from './components/footer/footer.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbDatepickerConfig, NgbDateParserFormatter,NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "./datepicker/ngb-date-fr-parser-formatter"

import { Ng2SearchPipeModule } from "ng2-search-filter";
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchComponent } from './components/search/search.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CreatePretComponent } from './components/create-pret/create-pret.component';
import { SortDirective } from './sorting/sort.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    EmployesComponent,
    EmployeDetailsComponent,
    PretsComponent,
    PretDetailsComponent,
    FooterComponent,
    SearchComponent,
    PageNotFoundComponent,
    CreatePretComponent,
    SortDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    Ng2SearchPipeModule

  ],
  providers: [
    AuthenticationService,
    AuthServiceService,
    UserServiceService,
    PretService,
    TokenStorageService,
    authInterceptorProviders,
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter},
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
