
import { Injectable } from '@angular/core';


import { AppUser } from '../model/app-user';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  

  constructor() {
   
  }


  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.setItem('token', token);
  }

  public getToken(): string {
    return sessionStorage.getItem('token');
  }

  public saveUser(user) {
    window.sessionStorage.removeItem('user');
    window.sessionStorage.setItem('user', JSON.stringify(user));
  }

  public getUser():AppUser {
    return JSON.parse(sessionStorage.getItem('user'));
  }



}
