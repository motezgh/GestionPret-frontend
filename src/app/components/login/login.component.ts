import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from  '@angular/router';
import { AppUser } from 'src/app/model/app-user';
import { AuthenticationService } from "src/app/services/authentication.service";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:AppUser=new AppUser();
  
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  
  isLoggedIn = false;
  isLoginFailed = false;
  //errorMessage = '';
 // roles: string[] = [];


  constructor(private formBuilder:FormBuilder,
              private route:ActivatedRoute,
              private authService:AuthServiceService ,
              private tokenStorage: TokenStorageService,
              private router: Router) {}

  ngOnInit() {
    if(this.tokenStorage.getUser()){
      this.router.navigateByUrl("/home");
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });

  // get return url from route parameters or default to '/'
  //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    

    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.user.roles = this.tokenStorage.getUser().roles;
      
    // }
  }

  // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }


//   onSubmit() {
//     this.submitted = true;

//     // stop here if form is invalid
//     if (this.loginForm.invalid) {
//         return;
//     }

//     this.loading = true;
//     this.tokenStorage.login(this.f.username.value, this.f.password.value)
//         .pipe(first())
//         .subscribe(
//             data => {
//                 this.router.navigate([this.returnUrl]);
//             },
//             error => {
//                 this.error = error;
//                 this.loading = false;
//             });
// }


  onSubmit() {
    this.submitted = true;
   
         // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        console.log(data)
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.user.roles = this.tokenStorage.getUser().roles;
        this.user.id=this.tokenStorage.getUser().id;
        this.router.navigate(['/home']);
        window.location.reload();
        this.loading=true;
      },
      err => {
        console.log('erreur '+err.message);
        this.error = 'error :  Username or password is incorrect';
        
        this.isLoginFailed = true;
        this.loading = false;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }


  // onLogin(){
  //  // console.log(data);
  //   this.authService.login(this.user)
  //   .subscribe(resp=>{
  //     console.log(resp);
  //     let jwt =resp.headers.get('Authorization');
  //     console.log(jwt);
  //     this.authService.saveToken(jwt);
  //     this.user=this.authService.user;
  //     console.log("user id  "+ this.authService.user.username);
  //     this.router.navigateByUrl('/home');
  //   },err=>{
  //     console.log(err);
  //     this.errorMessage = 'error :  Username or password is incorrect';
  //   })
    
  // }

  // isResponsable(){
  //   return this.authService.isResponsable();
  // }
  // isEmploye(){
  //   return this.authService.isEmploye();
  // }
  // isAuthenticated(){
  //   return this.authService.isAuthenticated();  
  // }

  // logout(){
  //   this.authService.logout();
  // }

}
