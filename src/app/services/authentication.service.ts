import { Injectable } from '@angular/core';
import { host } from "../domain/domain";
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AppUser } from "../model/app-user";
import { AppRole } from '../model/app-role';
import { Erole } from '../model/erole';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  role:AppRole=new AppRole();
  user:AppUser=new AppUser();
  jwt:string;
  // username:string;
  // roles:Array<string>;
  
  

  constructor(private http:HttpClient) { }

  login(appuser:AppUser): Observable<any> {
    console.log("appuser"+appuser);
    return this.http.post(host + "/login" ,appuser,{observe:"response"});
  }

  saveToken(jwt:string){
    
    localStorage.setItem('token',jwt);
    this.jwt=jwt;
    this.parseJWT();
  }
  parseJWT() {
    let jwtHelper=new JwtHelperService();
    let objJWT=jwtHelper.decodeToken(this.jwt);
    this.user.username=objJWT.sub;
    console.log("objet" + objJWT.sub);
    this.user.roles=objJWT.roles;
    console.log("objet" + objJWT.roles);
    this.user.id=objJWT.userId;
    console.log("objet userID " + objJWT.userId);
    
    
  }
  


  // isResponsable(){
  //   return this.user.roles.indexOf(this.role.name=Erole.RH)>=0;
  // }

  // isEmploye(){
  //   return this.user.roles.indexOf(Erole.EMPLOYE)>=0;
  // }

  // isAuthenticated(){
  //   return this.user.roles;
  // }


  // loadToken(){
    
  //   this.jwt=localStorage.getItem('token');
  //   this.parseJWT();
  // }

  // getToken(){
  //   return localStorage.getItem('token');
  // }

  

  // logout() {
  //   localStorage.clear();
  //   //this.initParams();
  // }
  // initParams() {
  //   this.jwt=undefined;
  //   this.username=undefined;
  //   this.roles=undefined;
  // }


}
