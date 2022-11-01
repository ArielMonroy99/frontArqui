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

  getOrders(page:number,size:number) {
    return this.http.get<any>(`${API_ULR}/order/all?page=${page}&size=${size}`);
  }

  updateOrderStatus(id:number, status:number) {
    return this.http.put<any>(`${API_ULR}/order/${id}/status/${status}`, {});
  }
}
