import { Observable } from 'rxjs';
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

  base='http://mohamednabiil-001-site1.ctempurl.com';
  

    ///////////////// Admin   ////////////////

    UploadHospital(body:any){

    return  this.http.post(`${this.base}/api/HospitalConfirmations`, body);
    }
    getAllHospital():Observable<any>{
      return this.http.get(`${this.base}/api/HospitalConfirmations`);
    }
    RegisterHospital(body:any){
      return this.http.post(`${this.base}/api/ApplicationUser/posthospital` , body);
    }
    LoginHospital(body:any){
      return this.http.post(`${this.base}/api/ApplicationUser/LoginHospital`, body)
    }
    getAcceptecdHospital(id:any){
    return this.http.get(`${this.base}/api/HospitalConfirmations/`+id)
    }
    CancelHospital(id:any){
      return  this.http.delete(`${this.base}/api/HospitalConfirmations/`+id);
    }
    GetHospitalData(id:any){
    return  this.http.get(`${this.base}/api/Hospital/getHospitalById/`+id)
    }


    ///////////////// Hospital Get  ////////////////

    getPatientBySsn(ssn:any):Observable<any>{
      return this.http.get(`${this.base}/api/PatientProfile/getPatientBySSN/${ssn}`);
    }
    getMedById(id:any):Observable<any>{
      return this.http.get(`${this.base}/api/MedicalHistories/GetMedicalHistory/${id}`);
    }
    ///////////////// Hospital Post  ////////////////
    addNewMedicine(body:any , id:any){
      return this.http.post(`${this.base}/api/Medicines/PostMedicine/${id}`, body)
    }
    addNewDisease(body:any , id:any){
      return this.http.post(`${this.base}/api/Diseases/PostDisease/${id}`, body)
    }
    addNewOperation(body:any , id:any){
      return this.http.post(`${this.base}/api/Operations/PostOperation/${id}`, body)
    }
    addNewSensitivitie(body:any , id:any){
      return this.http.post(`${this.base}/api/Sensitivities/PostSensitivity/${id}`, body)

    }

    /**
     *
     *
     *   Tests post
     *
     *
     */
    addNewPatient(body:any ){
      return this.http.post(`${this.base}/api/ApplicationUser/postUser`, body)
    }
    addMedData(body:any , id:any){
      return this.http.post(`${this.base}/api/MedicalHistories/PostMedicalHistory/${id}`, body)
    }
    ///////////////// Hospital delete  ////////////////
    deleteMedicine( id:any){
      return this.http.delete(`${this.base}/api/Medicines/DeleteMedicine/${id}`)
    }
    deleteDisease( id:any){
      return this.http.delete(`${this.base}/api/Diseases/DeleteDisease/${id}`)
    }
    deleteOperation( id:any){
      return this.http.delete(`${this.base}/api/Operations/DeleteOperation/${id}`)
    }
    deleteSensitivity( id:any){
      return this.http.delete(`${this.base}/api/Sensitivities/DeleteSensitivity/${id}`)
    }
    deleteTest( id:any){
      return this.http.delete(`${this.base}/api/Tests/DeleteTest/${id}`)
    }


    // التبرع بالدم//
    donation(body:any ,id:any){  
      return this.http.post(`${this.base}/api/Notifications/Post/${id}`, body)
    }



}
