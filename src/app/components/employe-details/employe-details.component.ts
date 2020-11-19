
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { switchMap } from 'rxjs/operators'; //enables me to make use of the params observable 
import { AppUser } from 'src/app/model/app-user';
import { Erole } from 'src/app/model/erole';
import { AppRole } from 'src/app/model/app-role';
import { Pret } from 'src/app/model/pret';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Econtrat } from 'src/app/model/econtrat';

@Component({
  selector: 'app-employe-details',
  templateUrl: './employe-details.component.html',
  styleUrls: ['./employe-details.component.scss']
})
export class EmployeDetailsComponent implements OnInit {
  errMess: string;
  userId:number[];
  user:AppUser;
  prets:Pret[];
  roleAddedMessage:string;
  successMsg=false;
  isResponsable=false;
  userRoles:AppRole[];

  editContratForm:FormGroup;

  contratTypes=Object.keys(Econtrat);
  
  constructor(private userService:UserServiceService,
    private route: ActivatedRoute,
    private fb:FormBuilder,
    private modalService:NgbModal) {
      this.createForm();
    }

  ngOnInit(): void {
    
    this.getUsersIds();
    //this.getRolesOfUser();
    this.route.params.pipe(switchMap((params:Params)=>{return this.userService.getUser(params['id']);}))
    .subscribe(user=>{this.getpretsOfUser(user.id);this.getRolesOfUser(user.id); this.user=user});
  }

  getUsersIds(){
    return this.userService.getUserIds()
    .subscribe(userId=>{
      this.userId=userId

    });
  }

  addRoleToUser(id){
    let c=confirm("Etes vous sure ?");
    if(!c) return;
    
    return this.userService.addRoleToUser(id)
    .subscribe(
      resp=> {console.log("add RH" + resp);this.successMsg=true; this.roleAddedMessage='vous avez ajouter le role RH a cet employé'},
      error=>{console.log("err add RH" + error)}
    );
  }
  
  
  getRolesOfUser(id){
    return this.userService.getRolesOfUser(id)
    .subscribe(
      resp=> {this.userRoles=resp;if(this.userRoles[1].id==2){this.isResponsable=true};console.log('roles '+resp[1].id)}
      );
    
  }

  getpretsOfUser(id){
    return this.userService.getPretsOfUser(id)
    .subscribe(
      resp=>{this.prets=resp}
    );
  }

  get g(){return this.editContratForm.controls}

  createForm(){
    this.editContratForm=this.fb.group({
      contratType:['',Validators.required],
      debutContrat:['',Validators.required],
      finContrat:[''],
      salaire:[null,Validators.required],
      departement:['',Validators.required],
      fonction:['',Validators.required]
    });
  }

  openEditUser(targetModal, user:AppUser ) {
    this.modalService.open(targetModal);
    this.editContratForm.patchValue({
      contratType:user.contratType,
      debutContrat:user.debutContrat,
      finContrat:user.finContrat,
      salaire:user.salaire,
      departement:user.departement,
      fonction:user.fonction
    });
  }

  editUserContrat(id){
    if (this.editContratForm.invalid){
      return;
    }
    this.userService.editUserContrat(id,this.editContratForm.value)
    .subscribe(
      resp=>{this.user=resp;console.log('edit'+resp)},
      error=>{console.log(error)}
    );
    this.modalService.dismissAll();
    location.reload();

  }

}
