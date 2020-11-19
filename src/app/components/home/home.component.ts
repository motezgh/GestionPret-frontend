import { Component, OnInit } from '@angular/core';
import { AppRole } from 'src/app/model/app-role';
import { AppUser } from 'src/app/model/app-user';
import { Erole } from 'src/app/model/erole';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserServiceService } from "src/app/services/user-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  username: string;
  email : String ;
  id:number;
  password : String ;
  newPassword: any;
  oldPassword:any;
  private employe: AppUser ; 

  user:AppUser=new AppUser();
  
  
  constructor(private authService: AuthenticationService,
    private tokenStorageService: TokenStorageService,
    private userService: UserServiceService) { }

  ngOnInit(): void {
    
    this.getUser();
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

  isResp(){
    const user1 =this.tokenStorageService.getUser();
    return  user1.roles.indexOf(Erole.RH)>=0;
  }



}
