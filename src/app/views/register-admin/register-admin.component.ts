import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  userForm:FormGroup
  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  
    this.userForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    lastname: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(7)]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  })
  }

  saveUser(){
    //console.table(this.userForm.value)
    let user = this.userForm.value
    user.role = ['ADMIN']
    console.log(user)
    this.userService.saveUser(user).subscribe(
      next=>{
        console.log(next)
        Swal.fire({
          title: 'Admin Created Succesfuly',
          icon: 'success'

        }).then(result =>{
          this.router.navigate(['login'])
        })
      }
    )
  }

}
