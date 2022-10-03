import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup(
   {
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
   }
  )
  constructor(private authService: AuthService) { }

  
  ngOnInit(): void { 

  }
  token: any

  login(){
    console.table(this.loginForm.value)
    this.authService.signin(this.loginForm.value).subscribe(
      data=>{
        console.table(data)
        this.token = data;
        localStorage.setItem("accessToken",JSON.stringify(this.token))
    
      }
    )
  }
  

}
