import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePretComponent } from './components/create-pret/create-pret.component';
import { EmployeDetailsComponent } from './components/employe-details/employe-details.component';
import { EmployesComponent } from './components/employes/employes.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PretDetailsComponent } from './components/pret-details/pret-details.component';
import { PretsComponent } from './components/prets/prets.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from "./guards/auth.guard";
import { Erole } from "./model/erole";


const routes: Routes = [
  
  { path: 'login',  component: LoginComponent  },
  { path: 'home',  component: HomeComponent  },
  { path: 'profile',  component: ProfileComponent , canActivate: [AuthGuard] },
  { path: 'employes',  component: EmployesComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH]  }},
  { path: 'employesDetails/:id',  component: EmployeDetailsComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH]  }},
  { path: 'prets',  component: PretsComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH]  }},
  { path: 'pretsDetails/:id',  component: PretDetailsComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH] }},

  { path: 'createPret',  component: CreatePretComponent , canActivate: [AuthGuard] },

  { path: 'search/:keyword' , component:EmployesComponent , canActivate: [AuthGuard] ,data: {roles: [Erole.RH] }},

  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
