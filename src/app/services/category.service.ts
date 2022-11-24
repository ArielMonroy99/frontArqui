import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/config';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  API_URL = Config.apiUrl + "/ms-store/category"
  // API_URL = "http://localhost:9191/category"
  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  test(){
    return this.http.get<any>(`${Config.apiUrl}/ms-store/test`,{responseType: 'text' as 'json'});
  }
}
