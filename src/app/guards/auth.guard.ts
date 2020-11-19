import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,
              private tokenStorageService:TokenStorageService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser=this.tokenStorageService.getUser();
      if(currentUser){
        // check if route is restricted by role
        if(route.data.roles && route.data.roles.indexOf(currentUser.roles[1])===-1){
          console.log(currentUser.roles[1] + "fail in " + route.data.roles);
          // role not authorised so redirect to home page
          this.router.navigateByUrl('/');
          return false;
        }
         // authorised so return true
        
        return true;
      }
      console.log("Need log in");
      // not logged in so redirect to login page with the return url{queryParams: {returnUrl: state.url}}
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
  }
  
}
