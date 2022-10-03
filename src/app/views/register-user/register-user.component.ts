import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  userForm:FormGroup
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    lastname: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phone: new FormControl('',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(7)]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmPassword: new FormControl('',[Validators.required,Validators.minLength(8)])

  },{validators: this.checkPasswords})
  }

  saveUser(){
    //console.table(this.userForm.value)
    let user = this.userForm.value
    user.role = ['USER']
    console.log(user)
    this.userService.saveUser(user).subscribe(
      next=>{
        console.log(next)
      }
    )
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password').value  
    let confirmPass = group.get('confirmPassword').value
    return pass === confirmPass ? null : { notSame: true }
  }
}
