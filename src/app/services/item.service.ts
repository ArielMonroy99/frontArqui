import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class ItemService {

  API_URL = Config.apiUrl + "/ms-store/item"
  // API_URL = "http://localhost:9191/item"
  constructor(private http: HttpClient) {}

  getAllItems(page: number, size: number, sort: string, sortDir: string) {
    return this.http.get<any>(
      `${this.API_URL}?page=${page}&size=${size}&sort=${sort}&sortDir=${sortDir}`
    );
  }

  getItemById(id: number) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  saveItem(item: any) {
    return this.http.post(this.API_URL, item);
  }

  updateItem(item: any) {
    return this.http.put(this.API_URL, item);
  }

  deleteItem(id: number) {
    return this.http.delete(this.API_URL + '/' + id);
  }
}
