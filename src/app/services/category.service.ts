import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/config';
import { Observable } from 'rxjs';

const url = config.apiUrl+'/category'

@Injectable({
  providedIn: 'root'
})

export class CategoryService {


  constructor(private http:HttpClient) { }

  getAllCategories():Observable<any>{
    return this.http.get<any>(url)
  }


}
