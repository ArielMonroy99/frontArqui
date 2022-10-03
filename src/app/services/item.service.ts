import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url = config.apiUrl + "/item";

  constructor(private http:HttpClient) { }

  getAllItems(page:number,size:number) {
    return this.http.get<any>(this.url+"?page="+page+"&size="+size);
  }

  getItemById(id: number) {
    return this.http.get(this.url + "/" + id);
  }

  saveItem(item: any) {
    return this.http.post(this.url, item);
  }

  updateItem(item: any) {
    return this.http.put(this.url, item);
  }

  deleteItem(id: number) {
    return this.http.delete(this.url + "/" + id);
  }
  
}
