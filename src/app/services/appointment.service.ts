import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/config';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  API_URL = Config.apiUrl + '/ms-vet/appointment';
  constructor(private http: HttpClient) { }

  getAvaliableSchedule(id: number, startDate: string ,endDate: string){
    return this.http.get(`${this.API_URL}?vetId=${id}&startDate=${startDate}&endDate=${endDate}`);
  }
  saveAppointment(appointment:any){
    return this.http.post(`${this.API_URL}`,appointment);
  }
  getAppointments(id:number,page:number,size:number){
    return this.http.get<any>(`${this.API_URL}/user/${id}?page=${page}&size=${size}`);
  }
  cancelAppointment(cancelation: any){
    return this.http.post(`${this.API_URL}/cancel`,cancelation,{responseType: 'text'});
  }
}
