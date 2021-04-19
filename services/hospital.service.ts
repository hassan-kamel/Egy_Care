import { Injectable } from '@angular/core';
import  {FormBuilder, Validators, FormGroup }   from '@angular/forms'
import {HttpClient , HttpHeaders}   from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
 
  constructor(private fb: FormBuilder , private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    })
  };




    UploadHospital(body:any){
      
    return  this.http.post("https://localhost:44309/api/HospitalConfirmations", body);
    }


   




}
