import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user : any = {}
  constructor(private router: Router, private sharedService: SharedServiceService) {
   
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : {role: 'GUEST'};
    console.log(this.user.role)
  }
  
  log(){
    console.log(this.user);
  }

  logOut(){
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    this.user = undefined
    window.location.reload();
    this.router.navigate(['/home'])
  }
  

}


