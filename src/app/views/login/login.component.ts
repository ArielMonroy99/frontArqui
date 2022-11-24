import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {}
  token: any;

  login() {
    console.table(this.loginForm.value);
    this.authService.signin(this.loginForm.value).subscribe((data) => {
      console.table(data);
      this.token = data;
      // this.sharedService.changeMessage(this.token)
      localStorage.setItem('accessToken', JSON.stringify(this.token));
      this.userService
        .getUser(this.loginForm.get('username').value)
        .subscribe((data) => {
          localStorage.setItem('user', JSON.stringify(data));
          Swal.fire({
            title: 'Login Succesfuly',
            icon: 'success',
          }).then((result) => {
            window.location.reload();
          });
        });
    });
  }
}
