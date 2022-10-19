import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = config.apiUrl + "/user";
  constructor(private http: HttpClient) { }

  saveUser(user: any){
    return this.http.post(this.url, user);
  }

  updateUser(user: any){
    return this.http.put(this.url, user);
  }
  getUser(username:string){
    return this.http.get(this.url+"/username?username="+username);
  }
  
}
