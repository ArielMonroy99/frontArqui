import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryService {
  API_URL = Config.apiUrl+'/ms-vet/veterinary';
  constructor(private http: HttpClient) { }
  saveVeterinary(vet: any){
    return this.http.post(this.API_URL, vet);
  }

  getVeterinaries(){
    return this.http.get(`${this.API_URL}?page=0&size=20`);
  }
}
