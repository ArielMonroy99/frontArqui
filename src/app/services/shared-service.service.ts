import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  
  // //private userSource = new BehaviorSubject<any>(this.user);
  // currentUser = this.userSource.asObservable();
  // changeMessage(user: any) {
  //   this.userSource.next(user)
  // }
  constructor() { }
}
