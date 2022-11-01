import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Schedule } from '../../models/Schedule';
import { VeterinaryService } from '../../services/veterinary.service';

@Component({
  selector: 'app-vet',
  templateUrl: './vet.component.html',
  styleUrls: ['./vet.component.css']
})
export class VetComponent implements OnInit {

  schedule = Schedule.newSchedule();
  vetForm: FormGroup
  constructor(private vetService: VeterinaryService, private router : Router) { }

  ngOnInit(): void {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): {role:['GUEST']}
    if(user.role[0] !== "ADMIN")
      this.router.navigate(['home'])
    this.vetForm= new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl('', [Validators.required,  Validators.minLength(3)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
      address: new FormControl('', [Validators.required, Validators.minLength(3)]),
      idNumber: new FormControl('', [Validators.required, Validators.minLength(3)]),
    })
  }
  changeState(schedule:any){
    if(schedule.avaliable ===0) schedule.avaliable = 1
    else schedule.avaliable = 0
   }
  resetSchedule(){
    this.schedule = Schedule.newSchedule(); 
  }
 
  
  formatVetSchedule(): any[]{
    this.schedule
    let schedule :any[] = [] 
    for(let i = 0; i < this.schedule.length; i++){
      schedule = schedule.concat(this.schedule[i])
    }
    return schedule
  }

  validateSchedule() : boolean{
    let schedule = this.formatVetSchedule()
    let total = 0
    for(let sche of schedule){
      if(sche.avaliable){
        total ++;
      }
      
    }
    return (total > 20 && total < 40);
  }

  saveVet(){
    if(!this.validateSchedule()){
      Swal.fire({
        title: 'Error!',
        text: 'Vet schedule must be between 20 and 40 hours',
        icon: 'error',
      })
      return 
    }
    let vet = {
      name: this.vetForm.get('name')?.value,
      lastname: this.vetForm.get('lastname')?.value,
      phone: this.vetForm.get('phone')?.value,
      address: this.vetForm.get('address')?.value,
      idNumber: this.vetForm.get('idNumber')?.value,
      schedules: this.formatVetSchedule()
    }
    console.log(vet);
    
    this.vetService.saveVeterinary(vet).subscribe(
       (data) => {
        console.log(data);
        
        Swal.fire({
          title: 'Success!',
          text: 'Vet saved',
          icon: 'success',
        })
        this.resetSchedule()
        this.vetForm.reset()
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Vet not saved',
          icon: 'error',
        })
      }
    )
     
  }
}
