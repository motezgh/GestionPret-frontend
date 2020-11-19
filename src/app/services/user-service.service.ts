import { Injectable } from '@angular/core';
import { AppUser } from '../model/app-user';
import { host } from "../domain/domain";
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pret } from '../model/pret';
import { AppRole } from '../model/app-role';
import { Econtrat } from '../model/econtrat';

import { catchError,map } from "rxjs/operators";
import { TokenStorageService } from './token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

 // user:AppUser;



  constructor(private http:HttpClient,
    private token:TokenStorageService) { }

  public getAllUsers():Observable<AppUser[]> {
    console.log("test call get all users");
    return this.http.get<getResponseUsers>(host+ "/appUsers")
    .pipe(map(response=>response._embedded.appUsers));
  }

  public getUser(id:number):Observable<AppUser> {
    console.log('test get user');
    return this.http.get<AppUser>(host + "/appUsers/" + id);
  }

  getUserIds(): Observable<number[] | any> {
    return this.getAllUsers().pipe(map(users => users.map(user => user.id)))
    .pipe(catchError(error => error));  
  }

  public getUserPrets(id:any):Observable<Pret> {
    return this.http.get<Pret>(host+ "/appUsers/" + id +"/prets" );
  }
  

  public addUser(appUser):Observable<AppUser>{
    // const registerBody={
    //   'username':username,
    //   'email':email,
    //   'password':password,
    //   'salaire':salaire,
    //   'contratType':contratType,
    //   'debutContrat':debutContrat,
    //   'finContrat':finContrat
    // }
    
    return this.http.post<AppUser>(host+"/register", appUser,httpOptions);
  }

  public editUser(id:number,appUser:AppUser):Observable<AppUser>{
    return this.http.patch<AppUser>(host+"/appUsers/"+id,appUser,httpOptions);
  }

  public editUserContrat(id:number,appUser:AppUser):Observable<AppUser>{
    return this.http.post<AppUser>(host+"/editUserContrat/"+id,appUser,httpOptions);
  }

  public updatePassword(id,passwordBody): Observable<AppUser> {
    
    return this.http.post<AppUser>(host+ "/updatePassword/"+id,passwordBody);
  }

  public updateUsername(id,usernameBody) {
    
    return this.http.post(host+ "/updateUsername/"+id,usernameBody);
  }

  deleteUser(id:number){
   // const header=new HttpHeaders({"authorization":"Bearer "+this.token.getToken()});
    return this.http.delete(host+ '/deleteUser/' + id);
  }

  searchUser(keyword:string):Observable<AppUser[]>{
    return this.http.get<AppUser[]>(host + "/searchUser?keyword=" + keyword)
    //.pipe(map(response=>response._embedded.appUsers));
  }

  addRoleToUser(id:number): Observable<any>{
    
    return this.http.post(host + "/addRoleResponsable/" + id ,httpOptions);
  }

  getRolesOfUser(id):Observable<AppRole[]>{
    return this.http.get<getResponseRoles>(host+"/appUsers/" + id +"/roles")
    .pipe(map(response=>response._embedded.appRoles))
    
  }

  getPretsOfUser(id:number):Observable<Pret[]>{
    return this.http.get<Pret[]>(host + "/appUsers/"+ id + "/prets")
  }


}

interface getResponseRoles{
    _embedded:{
      appRoles:AppRole[];
    }
}

interface getResponseUsers{
  _embedded:{
    appUsers:AppUser[];
  }
}


