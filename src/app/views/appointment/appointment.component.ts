import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/User';
import { AppointmentService } from 'src/app/services/appointment.service';
import { VeterinaryService } from 'src/app/services/veterinary.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  dayInMilis = 86400000; 
  vets: any[] = []
  vet: any = {}
  schedule: any[] = []
  monday: string 
  constructor(private vetService: VeterinaryService, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.getVets();
    this.monday = this.thisMonday() 
  }

  getVets() {
    this.vetService.getVeterinaries().subscribe(
      (data: any) => {
        this.vets = data.content;
      }
    )
  }
  getAvaliableSchedule(id:number,startDate:string,endDate: string) {
    this.appointmentService.getAvaliableSchedule(id, startDate, endDate).subscribe(
      (data: any) => {
        this.schedule = this.formatSchedule(data);
      }
    )
  }
  setVet(vet: any) {
    this.vet = vet;
    this.getAvaliableSchedule(vet.id,"2022-10-17","2022-10-23");
    console.log(this.schedule);
  }
  formatSchedule(unformattedSchedule: any[]): any[] {
    let schedule: any[] = []
    for (let i = 0; i < 12; i++) {
      schedule[i] = unformattedSchedule.slice(i * 6, (i + 1) * 6)
    }
    console.log(schedule);  
    return schedule
  }
  changeState(schedule: any) {
    console.log(this.monday);
    let day = new Date(this.monday);
    let date =  day.getTime() + this.dayInMilis * schedule.day
    const newDate = new Date(date);
    const appointmentDate = this.formatDate(newDate)
    console.log(schedule);
    let appointment = {
        date : appointmentDate,
         time : schedule.hour,
        veterinary: this.vet,
        user:JSON.parse(localStorage.getItem("user"))
    }
    Swal.fire({
      title: 'Do you want to make an appointmet in this date?',
      text: appointmentDate +" at "+schedule.hour,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.saveAppointment(appointment)
        
      } 
    })
  }
  setWeek(event:any){
    if(event.target.value==="1")
      this.monday = this.thisMonday()
    if(event.target.value==="2")
      this.monday = this.nextMonday()
    console.log(this.monday);
    this.getAvaliableSchedule(this.vet.id,this.formatDate(new Date(this.monday)),this.addDate(new Date(this.monday),7))
    }

  thisMonday():string{
    const curr = new Date; // get current date
    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    let firstday = new Date(curr.setDate(first+1));
    let dateString = new Date(firstday.getTime() - (firstday.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
    return dateString.toString();
  }
  nextMonday(){
    const curr = new Date; // get current date
    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    let firstday = new Date(curr.setDate(first+8));
    let dateString = new Date(firstday.getTime() - (firstday.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
    return dateString.toString();
  }
  formatDate(date:Date):string{
    const curr = date; // get current date
    let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
    console.log(dateString.toString());
    
    return dateString.toString();
  }
  addDate(date:Date,day:number):string{
    let newDay = new Date(date)
    let d =  newDay.getTime() + this.dayInMilis * day
    const newDate = new Date(d);
    return this.formatDate(newDate)
  }

  saveAppointment(appointment:any){
    this.appointmentService.saveAppointment(appointment).subscribe(
      () =>{
        Swal.fire({
          title: 'Appointment Saved',
          icon: 'success'
        })
        this.getAvaliableSchedule(this.vet.id,this.formatDate(new Date(this.monday)),this.addDate(new Date(this.monday),7))
       }
    )
  }
}
