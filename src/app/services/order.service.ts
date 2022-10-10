import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';

const API_ULR = config.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  saveOrder(order: any) {
    return this.http.post<any>(`${API_ULR}/order`, order);
  }
}
