import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/config';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  API_URL = Config.apiUrl;
  constructor(private http: HttpClient) { }

  productReports(year:number) {
    return this.http.get<Record<string,any>>(`${this.API_URL}/ms-store/report/products?year=${year}`);
  }

  veterinaryReports(year:number) {
    return this.http.get<Record<string,any>>(`${this.API_URL}/ms-vet/report/vets?year=${year}`);
  }
}
