import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { EmployesComponent } from '../employes/employes.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private userService:UserServiceService,
    private router:Router,
    private employe:EmployesComponent) { }

  ngOnInit(): void {
    
  }

  searchUser(keyword:string){
    console.log('keyword'+keyword);
    this.router.navigateByUrl('/search/' + keyword);
    //this.router.onSameUrlNavigation="reload"
    //this.employe.handleSearchEmployes()
  }


}
