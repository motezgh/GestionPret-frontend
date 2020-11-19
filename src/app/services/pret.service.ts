import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { host } from '../domain/domain';
import { AppUser } from '../model/app-user';
import { EtypeName } from '../model/etype-name';
import { Pret } from '../model/pret';
import { TypePret } from '../model/type-pret';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    
  })
};

@Injectable({
  providedIn: 'root'
})
export class PretService {

  constructor(private http:HttpClient ) { }

  getAllPret():Observable<Pret[]>{
    return this.http.get<getResponsePrets>(host+"/prets")
    .pipe(map(response=>response._embedded.prets));
  }

  getPret(id:number):Observable<Pret>{
    return this.http.get<Pret>(host+"/prets/"+id);
  }
  getPretEnCours():Observable<Pret[]>{
    return this.http.get<getResponsePrets>(host+"/prets/search/findByEtatLike?etat=ENCOURS")
    .pipe(map(response=>response._embedded.prets));
  }

  getPretAccepter():Observable<Pret[]>{
    return this.http.get<getResponsePrets>(host+"/prets/search/findByEtatLike?etat=ACCEPTER")
    .pipe(map(response=>response._embedded.prets));
  }

  getPretRefuser():Observable<Pret[]>{
    return this.http.get<getResponsePrets>(host+"/prets/search/findByEtatLike?etat=REFUSER")
    .pipe(map(response=>response._embedded.prets));
  }

  createPret(pret:Pret){
    // const pretBody={
    //   'montant':montant,
    //   'duree':duree,
    //   'nameType':nameType,
    //   'id':id
    // }
    return this.http.post<Pret>(host+"/createPret",pret);
  }

  updatePret(id,pret:Pret){
    return this.http.post(host+"/updatePret/"+id,pret,httpOptions);
  }


  accepterPret(id:number){
    return this.http.get(host+ "/accepterPret/" + id);
  }

  refuserPret(id:number){
    return this.http.get(host+"/refuserPret/" + id);
  }

  getUserOfPret(id:number):Observable<AppUser>{
    return this.http.get<AppUser>(host + "/prets/" + id + "/user");
  }

  getTypePretOfPret(id:number):Observable<TypePret>{
    return this.http.get<TypePret>(host+"/prets/"+id+"/typePret")
  }

  deletePret(id:number){
    return this.http.delete(host+"/deletePret/"+id);
  }


}

interface getResponsePrets{
  _embedded:{
    prets:Pret[];
  }
}

