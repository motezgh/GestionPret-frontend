import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/model/app-user';
import { UserServiceService } from 'src/app/services/user-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { Econtrat } from 'src/app/model/econtrat';

import {NgbDateParserFormatter, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import { EmailService } from 'src/app/services/email.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss']
})
export class EmployesComponent implements OnInit {

  errorMessageAdd:string;
  showErrorMessage=false;
  showSuccessMessage=false;
 // currentUser:AppUser;
  users:AppUser[];
  //usersSearch:AppUser[];
  contrats = Object.keys(Econtrat);
  model: NgbDateStruct;
  model2:NgbDateStruct;
  submitted= false;

  addUserForm: FormGroup;
  newUser:AppUser;

  searchMode:boolean;


  page:number=1;

  term:string;

  constructor(private userService:UserServiceService,
    private fb: FormBuilder,
    private parserFormatter:NgbDateParserFormatter,
    private emailService:EmailService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { 
      this.createForm();
    }

 
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(()=>{this.getAllUsers();})
    //this.getAllUsers();
    
  }
  getAllUsers() {
    this.searchMode=this.activatedRoute.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      //do search work
      this.handleSearchEmployes();
      
    }else {
      //display all users
      this.handleListEmployes();
    }
  }



   // convenience getter for easy access to form fields
   get f() { return this.addUserForm.controls; }


  createForm(){
    this.addUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      email: ['', [Validators.required, Validators.email] ],
      password : ['', [Validators.required] ],
      salaire:[null, [Validators.required] ],
      fonction:['',[Validators.required]],
      departement:['',[Validators.required]],
      contratType:['',[Validators.required]],
      debutContrat:['', [Validators.required] ],
      finContrat: ''//['', [Validators.required] ]
      
    });


  }


  addUser(){
    this.submitted = true;
    this.addUserForm.value.debutContrat=this.parserFormatter.format(this.model);
    this.addUserForm.value.finContrat=this.parserFormatter.format(this.model2);
    if (this.addUserForm.invalid){
      return;
    }
    this.userService.addUser(this.addUserForm.value)
    .subscribe(resp=>{
    this.newUser=resp;
    console.log("this is resp : "+ resp.id);
    this.emailService.sendCreatedAccountMessage(resp.id).subscribe(reponse=> console.log("emaiiiil" + reponse));
    this.showErrorMessage=false;
    this.showSuccessMessage=true;
   // window.location.reload();
   this.onReset();
   this.getAllUsers();
    },err=>{
      this.showErrorMessage=true;
      this.showSuccessMessage=false;
      this.errorMessageAdd=err.error.message;
      console.log(err);
    });
  }

  onReset() {
    this.submitted = false;
    this.addUserForm.reset();
  }

  deletUser(id:number){
    let c=confirm("Etes vous sure ?");
    if(!c) return;
    this.userService.deleteUser(id)
    .subscribe(rep=>{
      console.log(rep);
      //window.location.reload();
      this.getAllUsers();
    },err=>{
      console.log(err);
    });
  }

 

  handleListEmployes(){
    this.userService.getAllUsers()
    .subscribe((users)=>{
      this.users=users;
      console.log(users)
    },error=>{
      console.log(error);
    });
  }

  handleSearchEmployes(){
    const keyword:string =this.activatedRoute.snapshot.paramMap.get('keyword');
    
    this.userService.searchUser(keyword)
    .subscribe(
      resp=>{console.log('search000 '+resp); this.users=resp},
      error=>{console.log("error search"+error)}
    );
  }


}
