import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';
import { AddressModel } from '../models/Address';
const API_ULR = config.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AddressService {


  accessToken = JSON.parse(localStorage.getItem('accessToken'))
  headers : HttpHeaders = new HttpHeaders({
    'Authorization': 'Bearer ' + this.accessToken.accessToken
  })

  constructor(private http: HttpClient) {
    
   }

  getAddresses(id: number) {
    return this.http.get<any>(`${API_ULR}/address?userId=${id}&page=0&size=10`);
  }

  saveAddress(address: any) {
    return this.http.post<any>(`${API_ULR}/address`, address,{headers: this.headers});
  }
  updateAddress(address:any){
    return this.http.put<any>(`${API_ULR}/address`,address,{headers: this.headers});
  }

  deleteAddress(id:number){
    return this.http.delete<any>(`${API_ULR}/address/${id}`);
  }
}
