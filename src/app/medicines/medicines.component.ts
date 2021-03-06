import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fading } from './../animations/fading';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from 'services/hospital.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss'],
  animations:[fading]
})
export class MedicinesComponent implements OnInit {

  constructor(public _activatedRoute:ActivatedRoute,public _hospitalService:HospitalService, public _router:Router ) {
    let ssn=this._activatedRoute.snapshot.parent?.params.ssn;
    this.ssn=ssn;
    // console.log(ssn);
    _hospitalService.getPatientBySsn(ssn).subscribe((res)=>{
      // console.log(res.id);
      this.id=res.id;
      _hospitalService.getMedById(res.id).subscribe((res)=>{
        console.log(res.medicines);
        this.mData=res.medicines;

      },
      (err)=>{
        // console.log(err);
        this.error=err;
      }
      )
    }
    ,
    (err)=>{
      // console.log(err);
    }
    );
   };
    error:any;
    mData:any;
    mDate:any;
    addClicked:boolean=false;
    id:any;
    ssn:any;
    add(){
      this.addClicked=true;
    }
    desAdd(){
      this.addClicked=false;
    }

    disForm = new FormGroup({
      id:new FormControl(0,[]),
      name: new FormControl(null,[]),
      instructions: new FormControl(null,[]),
      startDate: new FormControl(null,[]),
      endDate: new FormControl(null,[]),
      medicalHistoryId:new FormControl(0,[])
    });

    submitForm(myForm:FormGroup){
      console.log(myForm.value);
      this._hospitalService.addNewMedicine(myForm.value,this.id).subscribe(
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
    delete(id:any){
      this._hospitalService.deleteMedicine(id).subscribe((res)=>{
        let currentUrl = this._router.url;
          this._router.routeReuseStrategy.shouldReuseRoute = () => false;
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate([currentUrl]);
      },
      (err)=>{
        console.log(err);
      })
    }

  ngOnInit(): void {
  };

}
