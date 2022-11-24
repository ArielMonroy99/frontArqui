import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = Config.apiUrl + "/ms-users/user";
  constructor(private http: HttpClient) { }

  saveUser(user: any){
    return this.http.post(this.API_URL, user);
  }
  updateUser(user: any){
    return this.http.put(this.API_URL, user);
  }
  getUser(username:string){
    return this.http.get(`${this.API_URL}/username?username=${username}`);
  }

}
