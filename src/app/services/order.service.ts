import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/config';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  API_URL= Config.apiUrl + "/ms-store/order";
  constructor(private http: HttpClient) { }

  saveOrder(order: any) {
    return this.http.post<any>(this.API_URL, order);
  }

  getOrders(page:number,size:number) {
    return this.http.get<any>(`${this.API_URL}/all?page=${page}&size=${size}`);
  }

  updateOrderStatus(id:number, status:number) {
    return this.http.put<any>(`${this.API_URL}/${id}/status/${status}`, {});
  }
}
