import {UserModel } from './User';
export class Appointment {
    id : number; 
    date : Date;
    veterinary : any;
    hour : string;
    user: UserModel;

}