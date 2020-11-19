import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { host } from '../domain/domain';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json'
    
//   })
//};

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http : HttpClient) { }


  sendCreatedAccountMessage(id:number){
    return this.http.get(host + "/userCreatedMessage/" + id);
  }

  sendPretResponseMessage(id:number){
    return this.http.get(host+"/pretResponseMessage/"+id);
  }


}
