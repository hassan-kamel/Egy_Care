import { fading } from './../animations/fading';
import { HospitalService } from './../../../services/hospital.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  animations:[fading]
})
export class PatientComponent implements OnInit {

  pData:any;
  pSsn:any;
  pAge:any;
  pErr:any=null;
  mData:any;
  addClicked:boolean=false;
  ssn:any;
  hospitalID: any;
  medErr:any;

constructor(private _activatedRoute:ActivatedRoute,private _hospitalService:HospitalService,public _router:Router) {

  let ssn = _activatedRoute.snapshot.params.ssn;
  this.pSsn=ssn;
  console.log(this.pSsn.toString(10).length);
  this.hospitalID= this._router.url.slice(6,(this._router.url.length)-(18+this.pSsn.toString(10).length));
  console.log(this.hospitalID);
    _hospitalService.getPatientBySsn(ssn).subscribe((res)=>{
      console.log(res);
      // console.log(res.id);
      this.pData=res;
      this.pAge=2021-Number(res.dateOfBirth.substring(0,4));
      // console.log(this.pAge);
        _hospitalService.getMedById(res.id).subscribe((res)=>{
          console.log(res);
          this.mData=res;

        },
        (err)=>{
          console.log(err);
          this.medErr=err;

        }
        )
      }
    ,
    (err)=>{
      console.log(err);
      this.pErr=err;
    }
    );


  }
  add(){
    this.addClicked=true;
  }
  desAdd(){
    this.addClicked=false;
  }

  patientForm = new FormGroup({
    fullName: new FormControl(null,[]),
    dateOfBirth: new FormControl(null,[]),
    patientSSN: new FormControl(null,[]),
    phoneNumber: new FormControl(null,[]),
    password: new FormControl(null,[]),
    userName: new FormControl(null,[]),
    gender: new FormControl(null,[]),
    city: new FormControl(null,[]),
    relativeOneName: new FormControl(null,[]),
    relativeOnePhoneNumber: new FormControl(null,[]),
    relativeTwoName: new FormControl(null,[]),
    relativeTwoPhoneNumber: new FormControl(null,[]),
    role: new FormControl(null,[]),
  });
  submitForm(myForm:FormGroup){
    console.log(myForm.value.patientSSN);
    this._hospitalService.addNewPatient(myForm.value).subscribe(
      (res)=>{

        let currentUrl = this._router.url;
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        // console.log(currentUrl);
        this._router.navigate([`/patient/${myForm.value.patientSSN}/personal`]);
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  patientSearch(e:any){
    // console.log(e);
   if(e.keyCode==13){
   this.navigate();

   }

}

  navigate(){

   if(this.ssn){
    let currentUrl = this._router.url;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    // console.log(currentUrl);
    this._router.navigateByUrl(`home/${this.hospitalID}/patient/${this.ssn}/personal`);
  }
  }
  ngOnInit(): void {
  }

}
