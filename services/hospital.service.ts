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



    ///////////////// Admin   ////////////////

    UploadHospital(body:any){

    return  this.http.post("https://localhost:5001/api/HospitalConfirmations", body);
    }
    getAllHospital():Observable<any>{
      return this.http.get("https://localhost:5001/api/HospitalConfirmations");
    }

    ///////////////// Hospital Get  ////////////////

    getPatientBySsn(ssn:any):Observable<any>{
      return this.http.get(`https://localhost:5001/api/PatientProfile/getPatientBySSN/${ssn}`);
    }
    getMedById(id:any):Observable<any>{
      return this.http.get(`https://localhost:5001/api/MedicalHistories/GetMedicalHistory/${id}`);
    }
    ///////////////// Hospital Post  ////////////////
    addNewMedicine(body:any , id:any){
      return this.http.post(`https://localhost:5001/api/Medicines/PostMedicine/${id}`, body)
    }
    addNewDisease(body:any , id:any){
      return this.http.post(`https://localhost:5001/api/Diseases/PostDisease/${id}`, body)
    }
    addNewOperation(body:any , id:any){
      return this.http.post(`https://localhost:5001/api/Operations/PostOperation/${id}`, body)
    }
    addNewSensitivitie(body:any , id:any){
      return this.http.post(`https://localhost:5001/api/Sensitivities/PostSensitivity/${id}`, body)

    }

    /**
     *
     *
     *   Tests post
     *
     *
     */
    addNewPatient(body:any ){
      return this.http.post(`https://localhost:5001/api/ApplicationUser/postUser`, body)
    }
    addMedData(body:any , id:any){
      return this.http.post(`https://localhost:5001/api/MedicalHistories/PostMedicalHistory/${id}`, body)
    }
    ///////////////// Hospital delete  ////////////////
    deleteMedicine( id:any){
      return this.http.delete(`https://localhost:5001/api/Medicines/DeleteMedicine/${id}`)
    }
    deleteDisease( id:any){
      return this.http.delete(`https://localhost:5001/api/Diseases/DeleteDisease/${id}`)
    }
    deleteOperation( id:any){
      return this.http.delete(`https://localhost:5001/api/Operations/DeleteOperation/${id}`)
    }
    deleteSensitivity( id:any){
      return this.http.delete(`https://localhost:5001/api/Sensitivities/DeleteSensitivity/${id}`)
    }
    deleteTest( id:any){
      return this.http.delete(`https://localhost:5001/api/Tests/DeleteTest/${id}`)
    }


}
