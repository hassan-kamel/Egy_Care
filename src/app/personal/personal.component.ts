import { fading } from './../animations/fading';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from 'services/hospital.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  animations:[fading]
})
export class PersonalComponent implements OnInit {

  disErr:any;
  pData: any;
  pAge: any;
  pSsn: any;
  addClicked: any;
  id: any;
  mData: any;
  medErr: any;
  constructor(public _activatedRoute:ActivatedRoute,public _hospitalService:HospitalService, public _router:Router ) {
    let ssn=this._activatedRoute.snapshot.parent?.params.ssn;
    this.pSsn=ssn;
    // console.log(ssn);
    _hospitalService.getPatientBySsn(ssn).subscribe((res)=>{
      // console.log(res);
      this.id=res.id;

      this.pData=res;
      this.pAge=2021-Number(res.dateOfBirth.substring(0,4));

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
      // console.log(err);
    }
    );
   }

   add(){
    this.addClicked=true;
  }
  desAdd(){
    this.addClicked=false;
  }
  bloodForm = new FormGroup({
    bloodType:new FormControl(null,[]),
  });
  submitMedical(myForm:FormGroup){
    console.log(this.id);
    this._hospitalService.addMedData(myForm.value,this.id).subscribe((res)=>{
      console.log(res);
        // let currentUrl = this._router.url;
        // this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        // this._router.onSameUrlNavigation = 'reload';
        // // console.log(currentUrl);
        // this._router.navigate([`/patient/${this.addedSsn}/personal`]);
    },
    (err)=>{
      console.log(err);
    });
  }

  submitForm(myForm:FormGroup){
    console.log(myForm.value);
    console.log(this.id);

    this._hospitalService.addNewDisease(myForm.value,this.id).subscribe(
      (res)=>{
        console.log(res);
        let currentUrl = this._router.url;
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate([currentUrl]);
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  ngOnInit(): void {
  }

}
