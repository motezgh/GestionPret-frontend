import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/app-user';
import { Econtrat } from 'src/app/model/econtrat';
import { Pret } from 'src/app/model/pret';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserServiceService } from 'src/app/services/user-service.service';

import { DateValidator } from "src/app/date-validator/dateValidator";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PretService } from 'src/app/services/pret.service';
import { EtypeName } from 'src/app/model/etype-name';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  showErrorMessageUsername=false;
  showSuccessMessageUsername=false;
  errorMessageUsername:string;
  showErrorMessagePassword=false;
  showSuccessMessagePassword=false;

  user:AppUser;
  prets:Pret[];
  pret:Pret;

  isCDI=false;

  editUserForm:FormGroup;
  submittedPret=false;
  submitted=false;
  editPretForm:FormGroup;
  passwordForm:FormGroup;
  usernameForm:FormGroup;

  typePretNames=Object.keys(EtypeName);

  page:number=1;

  constructor(private tokenStorageService:TokenStorageService,
              private userService:UserServiceService,
              private pretService:PretService,
              private fb:FormBuilder,
              private modalService:NgbModal) { 
                this.createForm();
                this.createFormPret();
                this.createPasswordForm();
                this.createdUsernameForm();
              }

  ngOnInit(): void {

    this.getUser();
    this.getPretOfUser();
    
  }
  

  getUser(){
    const user1 =this.tokenStorageService.getUser();
    
    console.log(user1);
    this.userService.getUser(user1.id )
    .subscribe(resp=>{
    
      this.user=resp;
      
      console.log(this.user.id + 'here');
    },err=>{
      console.log("error home get user")
    });
  }

  getPretOfUser(){
    const currentUser =this.tokenStorageService.getUser();
    return this.userService.getPretsOfUser(currentUser.id)
    .subscribe(
      resp=>{this.prets=resp}
    )
  }

  get f() { return this.editUserForm.controls; }

  get g() { return this.editPretForm.controls; }


  createForm(){
    this.editUserForm=this.fb.group(
      {
        nom:[''],
        prenom:[''],
        phone:[''],
        adresse:[''],
        dateNaissance:['']
      }
    );
  }

  openEdit(user:AppUser){
   
    this.editUserForm.patchValue(
      {
        nom:user.nom,
        prenom:user.prenom,
        phone:user.phone,
        adresse:user.adresse,
        dateNaissance:user.dateNaissance
      }
    );
  }

  

  editUser(id){
    //const currentUser =this.tokenStorageService.getUser();
    this.submitted = true;
    if(this.editUserForm.invalid){
      return;
    }
    return this.userService.editUser(id,this.editUserForm.value)
    .subscribe(
      resp=>{this.user=resp;location.reload()},
      error=>{console.log(error)}
    );
  }


  openEditPret(targetModal, pret:Pret ) {
    this.modalService.open(targetModal);
    this.editPretForm.patchValue({
      id:pret.user.id,
      duree:pret.dureeRemboursement,
      montant:pret.montant,
      typePret:pret.typePret.nameType
    });
 }

  createFormPret(){
    this.editPretForm=this.fb.group({
      id:'',
      duree:[null,Validators.required],
      montant:[null,Validators.required],
      typePret:['',Validators.required]
    });

    // this.editPretForm.valueChanges
    // .subscribe(
    //   data=>this.onValueChanged(data)
    // );
    // this.onValueChanged();
  }

  

  updatePret(id){
    this.submittedPret=true
      this.pretService.updatePret(id,this.editPretForm.value)
      .subscribe(
        resp=>{console.log('pret modified' + resp)},
        error=>{console.log(error)}
      );
      this.modalService.dismissAll();
      location.reload();
    
  }

  deletePret(id){
    let c=confirm("Etes vous sure ?");
    if(!c) return;
    this.pretService.deletePret(id)
    .subscribe(
      resp=>{console.log('pret supprimer');this.getPretOfUser()},
      error=>console.log(error)
    )
  }


  // onValueChanged(data?: any) {
  //   if (!this.editPretForm) { return; }
  //   const form = this.editPretForm;
  //   for (const field in this.formErrors) {
  //     if (this.formErrors.hasOwnProperty(field)) {
  //       // clear previous error message (if any)
  //       this.formErrors[field] = '';
  //       const control = form.get(field);
  //       if (control && control.dirty && !control.valid) {
  //         const messages = this.validationMessages[field];
  //         for (const key in control.errors) {
  //           if (control.errors.hasOwnProperty(key)) {
  //             this.formErrors[field] += messages[key] + ' ';
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  // formErrors = {
  //   'duree': '',
  //   'montant': '',
  //   'typePret':''
  // };

  // validationMessages = {
  //   'duree': {
  //     'required':      'Duree is required.'
      
      
  //   },
  //   'montant': {
  //     'required':      'Montant is required.'
  //   },
  //   'typePret': {
  //     'required':      'Type de pret is required.'
  //   }
  // };

  createPasswordForm(){
    this.passwordForm=this.fb.group({
      oldPass:['',Validators.required],
      newPass:['',Validators.required]
    });
  }

  createdUsernameForm() {
    this.usernameForm=this.fb.group({
      username:''
      //['',Validators.minLength(5),Validators.maxLength(15)]
    });
  }

  updatePassword(id){
    if(this.passwordForm.invalid){
      return;
    }
    this.userService.updatePassword(id,this.passwordForm.value)
    .subscribe(
      resp=>{console.log('password updated '+resp);this.showSuccessMessagePassword=true},
      error=>{console.log('update password error '+error);this.showErrorMessagePassword=true}
    );
  }

  updateUsername(id){
    let c=confirm("Vous devez reconnecter, Etes vous sure ? ");
    if(!c) return;
    if(this.usernameForm.invalid){
      return;
    }
    this.userService.updateUsername(id,this.usernameForm.value)
    .subscribe(
      resp=>{console.log('username updated' +resp);this.showSuccessMessageUsername=true;this.tokenStorageService.signOut()},
      error=>{console.log('error update username'+error);this.showErrorMessageUsername=true;this.errorMessageUsername="Username existe!"}
    );
    
  }

}
