import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Config} from "../../config";
@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}
  API_URL = Config.apiUrl + "/ms-store"
  getAddresses(id: number) {
    return this.http.get<any>(`${this.API_URL}/address?userId=${id}&page=0&size=10`);
  }

  saveAddress(address: any) {
    return this.http.post<any>(`${this.API_URL}/address`, address);
  }
  updateAddress(address: any) {
    return this.http.put<any>(`${this.API_URL}/address`, address);
  }

  deleteAddress(id: number) {
    return this.http.delete<any>(`${this.API_URL}/address/${id}`);
  }
}
