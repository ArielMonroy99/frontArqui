import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = Config.apiUrl + "/auth";
  constructor(private http: HttpClient) { }

  signin(user: any){
    return this.http.post(this.url + "/signin", user);
  }

}
