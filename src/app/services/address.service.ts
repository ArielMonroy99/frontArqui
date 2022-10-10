import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';
import { AddressModel } from '../models/Address';
const API_ULR = config.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAddresses(id: number) {
    return this.http.get<any>(`${API_ULR}/address?userId=${id}&page=0&size=10`);
  }

  saveAddress(address: any) {
    return this.http.post<any>(`${API_ULR}/address`, address);
  }
  updateAddress(address:any){
    return this.http.put<any>(`${API_ULR}/address`,address);
  }

  deleteAddress(id:number){
    return this.http.delete<any>(`${API_ULR}/address/${id}`);
  }
}
