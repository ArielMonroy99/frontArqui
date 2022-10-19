import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';
const API_URL = config.apiUrl+'/veterinary';
@Injectable({
  providedIn: 'root'
})
export class VeterinaryService {

  constructor(private http: HttpClient) { }
  saveVeterinary(vet: any){
    return this.http.post(API_URL, vet);
  }
  
  getVeterinaries(){
    return this.http.get(API_URL+'?page=0&size=20');
  }
}
