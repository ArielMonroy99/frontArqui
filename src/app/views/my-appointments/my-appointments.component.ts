import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css'],
})
export class MyAppointmentsComponent implements OnInit {
  user: any;
  appointments: any[] = [];
  page: number = 1;
  size: number = 5;
  totalItems: number = 0;
  totalArray: number[] = [];
  date: Date = new Date();
  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService
      .getAppointments(this.user.id, this.page - 1, this.size)
      .subscribe((data) => {
        console.log(data);
        this.totalItems = Math.ceil(data.totalElements / this.size);
        this.appointments = data.content;
        this.totalArray = this.getTotalPages();
      });
  }
  getTotalPages(): number[] {
    console.log(this.page, this.totalItems);
    if (this.totalItems <= 5) {
      let array: number[] = [];
      for (let i = 0; i < this.totalItems; i++) {
        array.push(i + 1);
      }
      console.log(array);
      return array;
    }
    if (this.page === this.totalItems)
      return [
        this.totalItems - 4,
        this.totalItems - 3,
        this.totalItems - 2,
        this.totalItems - 1,
        this.totalItems,
      ];
    if (this.page === this.totalItems - 1)
      return [
        this.totalItems - 3,
        this.totalItems - 2,
        this.totalItems - 1,
        this.totalItems,
        this.totalItems + 1,
      ];
    if (this.page < 5) return [1, 2, 3, 4, 5];

    return [
      this.page - 2,
      this.page - 1,
      this.page,
      this.page + 1,
      this.page + 2,
    ];
  }

  setPage(page: number) {
    this.page = page;
    this.getAppointments();
  }
  nextPage() {
    this.page++;
    this.getAppointments();
  }
  previousPage() {
    this.page--;
    this.getAppointments();
  }
  checkDate(appointment: any): boolean {
    let utcDate = appointment.date.split('-');
    let hour = appointment.time.split(':');
    utcDate[1] = (parseInt(utcDate[1]) - 1).toString();
    hour[0] = (parseInt(hour[0]) + 4).toString();
    let date = new Date(Date.UTC(utcDate[0], utcDate[1], utcDate[2], hour[0]));
    return date.getTime() < this.date.getTime();
  }
  checkActive(appointment: any): number {
    let validDate = this.checkDate(appointment);
    if (!validDate && appointment.status === 1) return 1;
    if (!validDate && appointment.status === 2) return 3;
    return 2;
  }
  cancelAppointment(appointment: any) {
    let cancelation = {
      reason: 'No got any time',
      appointment: appointment,
    };
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.appointmentService
          .cancelAppointment(cancelation)
          .subscribe((data) => {
            Swal.fire(
              'Cancelled!',
              'Your appointment has been cancelled.',
              'success'
            );
            this.getAppointments();
          });
      }
    });
  }
}
