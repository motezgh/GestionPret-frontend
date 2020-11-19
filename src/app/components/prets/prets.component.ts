import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/app-user';
import { Pret } from 'src/app/model/pret';
import { TypePret } from 'src/app/model/type-pret';
import { PretService } from 'src/app/services/pret.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-prets',
  templateUrl: './prets.component.html',
  styleUrls: ['./prets.component.scss']
})
export class PretsComponent implements OnInit {


  prets:Pret[];
  pret:Pret;
  user:AppUser;
  typePret:TypePret;

  constructor(private pretService:PretService,
    private userService:UserServiceService) { }

  ngOnInit(): void {
    //this.getPretEncours()
    this.getAllPrets();
  }

  getAllPrets(){
    return this.pretService.getAllPret()
    .subscribe(
      resp=>{this.prets=resp},
      error=>{}
      );
  }

  actualiser(){
    window.location.reload()
  }

  getPretEncours(){
    return this.pretService.getPretEnCours()
    .subscribe(
      resp=>{this.prets=resp;console.log("pret encours "+resp[0].id)},
      error=>{}
      );
  }

  getPretAccepter(){
    return this.pretService.getPretAccepter()
    .subscribe(
      resp=>{this.prets=resp;console.log("pret accepter "+resp[0].id)},
      error=>{}
      );
  }

  getPretRefuser(){
    return this.pretService.getPretRefuser()
    .subscribe(
      resp=>{this.prets=resp;console.log("pret refuser "+resp[0].id)},
      error=>{}
      );
  }

}
