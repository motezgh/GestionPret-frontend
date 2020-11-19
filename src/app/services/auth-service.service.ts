import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { host } from "../domain/domain";
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  islogin = false ;

  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    this.islogin=true;
    return this.http.post(host + '/login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
    //this.islogin=true;
  }


}
