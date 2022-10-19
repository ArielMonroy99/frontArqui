import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';

const API_ULR = config.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  productReports() {
    return this.http.get<Record<string,any>>(`${API_ULR}/report/products`);
  }
}
