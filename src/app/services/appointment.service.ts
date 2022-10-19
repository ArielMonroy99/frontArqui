import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';
const API_URL = config.apiUrl + '/appointment';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getAvaliableSchedule(id: number, startDate: string ,endDate: string){
    return this.http.get(`${API_URL}?vetId=${id}&startDate=${startDate}&endDate=${endDate}`);
  }
  saveAppointment(appointment:any){
    return this.http.post(`${API_URL}`,appointment);
  }
  getAppointments(id:number){
    return this.http.get(`${API_URL}/user/${id})`);
  }
  cancelAppointment(cancelation: any){
    return this.http.post(`${API_URL}/cancel`,cancelation)
  }
}