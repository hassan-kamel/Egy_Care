import { Component, OnInit } from '@angular/core';
import {  FormBuilder ,  Validators , FormGroup, FormControl } from '@angular/forms';
import { HospitalService } from './../../../services/hospital.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
  form: FormGroup;
  constructor(public _Router:Router , private fb: FormBuilder ,public _activatedRoute:ActivatedRoute,public _hospitalService:HospitalService, public _router:Router) { 

    this.form  = this.fb.group({
      title:['', Validators.required],
      body:['', Validators.required],
      bloodType:['', Validators.required],
      city:['', Validators.required],
      patientName:['', Validators.required],
      numberOfBags:['', Validators.required]
    })


  }
Id:any;
  ngOnInit(): void { 
    let x =  this._router.url;
     this.Id = x.substr(6 , 1) 
  }


   

  onSubmit(){
  var body = {
    title:this.form.get('title')?.value,
    body:this.form.get('body')?.value,
    bloodType:this.form.get('bloodType')?.value,
    city:this.form.get('city')?.value,
    patientName:this.form.get('patientName')?.value,
    numberOfBags:this.form.get('numberOfBags')?.value,

  }
  console.log(body);
this._hospitalService.donation(body , this.Id)
.subscribe((res)=>{
  if(res){
    console.log('done')
    
    
      console.log('no')
    
  }
  
} , (err) => {alert("no user found to send notfiactions")})



  }



}
