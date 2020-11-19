import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'src/app/model/app-user';
import { Etat } from 'src/app/model/etat';
import { Pret } from 'src/app/model/pret';
import { PretService } from 'src/app/services/pret.service';
import { NgbModal,ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { TypePret } from 'src/app/model/type-pret';
import { EmailService } from 'src/app/services/email.service';
import { EtypeName } from 'src/app/model/etype-name';

@Component({
  selector: 'app-pret-details',
  templateUrl: './pret-details.component.html',
  styleUrls: ['./pret-details.component.scss']
})
export class PretDetailsComponent implements OnInit {

  user:AppUser;
  pret:Pret;
  submitted=false;
  
  accepterError: string;
  updateError: string;
  editPretForm:FormGroup;
  closeResult: string;
  typePret: TypePret;
  typePretNames=Object.keys(EtypeName);
  constructor(private pretService:PretService,
    private emailService:EmailService,
    private activetedRoute:ActivatedRoute,
    private fb :FormBuilder,
    private modalService:NgbModal) { 
      this.createForm();
    }

  ngOnInit(): void {
    this.activetedRoute.paramMap.subscribe(
      ()=>{this.getPret();this.getUserOfPret();this.getTypePretOfPret()}
    )
  }
  getTypePretOfPret() {
    const id:number =+this.activetedRoute.snapshot.paramMap.get('id');
    return this.pretService.getTypePretOfPret(id)
    .subscribe(
      resp=>{this.typePret=resp;console.log('pret details ' + resp.id)},
      error=>{}
    );
  }

  getPret(){
    const id:number =+this.activetedRoute.snapshot.paramMap.get('id');
    return this.pretService.getPret(id)
    .subscribe(
      resp=>{this.pret=resp;console.log('pret details ' + resp.id)},
      error=>{}
    );
  }

  getUserOfPret(){
    const id:number =+this.activetedRoute.snapshot.paramMap.get('id');
    this.pretService.getUserOfPret(id)
    .subscribe(
      resp=>{this.user=resp;console.log('user of pret ' +resp.id)},
      error=>{console.log(error)}
    );
  }

  envoyerEmail(id){
    return this.emailService.sendPretResponseMessage(id)
    .subscribe(
      resp=>{console.log('id:'+id);location.reload()},
      error=>{console.log(error)}
    )
  }

  accepterPret(id){
    return this.pretService.accepterPret(id)
    .subscribe(
      resp =>{console.log(' accepter ' +resp);
      
      //location.reload()
      //this.emailService.sendPretResponseMessage(id).subscribe(reponse=> console.log("emaiiiil" + reponse));
      },
      error=>{console.log('errror accepter ' +error);this.accepterError='vous pouvez pas accepter ce pret'}
    );
  }

  refuserPret(id){
    return this.pretService.refuserPret(id)
    .subscribe(
      resp =>{console.log(' refuser ' +resp);
      
      
      //this.emailService.sendPretResponseMessage(id).subscribe(reponse=> console.log("emaiiiil" + reponse));
     },
      error=>{console.log('errror refuser ' +error)}
    );
  }

  openEdit(targetModal, pret:Pret,user:AppUser,typePret:TypePret ) {
    this.modalService.open(targetModal);
    this.editPretForm.patchValue({
      id:user.id,
      duree:pret.dureeRemboursement,
      montant:pret.montant,
      typePret:typePret.nameType
    });
 }

  createForm(){
    this.editPretForm=this.fb.group({
      id:'',
      duree:[null,Validators.required],
      montant:[null,Validators.required],
      typePret:['',Validators.required]
    });
  }

  get f() { return this.editPretForm.controls; }

  updatePret(id){
    this.submitted=true
      this.pretService.updatePret(id,this.editPretForm.value)
      .subscribe(
        resp=>{console.log('pret modified' + resp)},
        error=>{console.log(error)}
      );
      this.modalService.dismissAll();
      location.reload();
    
  }


  


}
