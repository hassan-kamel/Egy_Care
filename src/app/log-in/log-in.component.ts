import { Component, OnInit } from '@angular/core';
import {FormArray , FormGroup , FormControl , FormBuilder, Validators} from '@angular/forms';
import {HospitalService}  from '../../../services/hospital.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  form:FormGroup;
  constructor(private _FormBuilder:FormBuilder  ,public _HospitalService:HospitalService , private _router: Router) {

    this.form =  this._FormBuilder.group({
      "Email":[null , [Validators.required]],
      "Password":[null , [Validators.required]],

      })



  }
    res:any;

  submitForm() {
    if (!this.form.valid) {
      return;
    }

    let loginHospital = {
      email:this.form.get('Email')?.value,
      password:this.form.get('Password')?.value,
    }
       this._HospitalService.LoginHospital(loginHospital)
       .subscribe(res=>{
         this.res = res;

         this._router.navigate(['/home/'+this.res.id]);
         localStorage.setItem('token' , this.res.token);
       })
       this.form.reset();
  }
  toggleIcon(e: any){
    e.target.classList.toggle('fa-eye-slash');
  }


  ngOnInit(): void {
  }

}
