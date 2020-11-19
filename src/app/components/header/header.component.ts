import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Erole } from 'src/app/model/erole';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  
  isLoggedIn = false;
  private roles: string[];
  
  isResponsable = false;
  isEmploye = false;
  username: string;

  constructor(private tokenStorageService:TokenStorageService,
    private route:Router) {}
  
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getUser();
    
    
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.isResponsable = this.roles.includes('RH');
      this.isEmploye = this.roles.includes('EMPLOYE');

      this.username = user.username;

     
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    this.isLoggedIn=false;
    this.isResponsable=false;
    this.isEmploye=false;
    //window.location.reload();
    
  }

  // isRH(){
  //   const currentUser=this.tokenStorageService.getUser()
  //   return currentUser.roles.indexOf(Erole.RH)>=0;
  //   }
  //   isAuthenticated(){
  //     return !!this.tokenStorageService.getToken();
  //   }

}
