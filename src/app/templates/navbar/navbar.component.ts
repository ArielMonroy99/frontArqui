import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private keycloak: KeycloakService,private userService:UserService) {}
  logout() {
    this.keycloak.logout();
  }
  user:any = {}
  ngOnInit() {
    alert(this.keycloak.getUserRoles())
    this.keycloak.loadUserProfile().then((profile) => {
      console.log(profile)
      this.userService.getUser(profile.username).subscribe(
        {
          next: (data) => {
            localStorage.setItem('user', JSON.stringify(data));
          },
          error: (err) => {
            if(err.status===404){
              this.user = {
                email: profile.email,
                name: profile.firstName,
                lastname: profile.lastName,
                username: profile.username,
                phone: "7070707070",
                password: "123456",
              }
              this.userService.saveUser(this.user).subscribe(
                {
                  next: (data) => {
                    console.log(data)
                    localStorage.setItem('user', JSON.stringify(data));
                  }
                }
              )
            }
          }
        }
      )
    });
  }

}
