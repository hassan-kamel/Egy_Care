import { fading } from './../animations/fading';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from 'services/hospital.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sensitivities',
  templateUrl: './sensitivities.component.html',
  styleUrls: ['./sensitivities.component.scss'],
  animations:[fading]
})
export class SensitivitiesComponent implements OnInit {


  constructor(public _activatedRoute:ActivatedRoute,public _hospitalService:HospitalService,public _router:Router) {
    let ssn=this._activatedRoute.snapshot.parent?.params.ssn;
    // console.log(ssn);
    _hospitalService.getPatientBySsn(ssn).subscribe((res)=>{
      // console.log(res.id);
      this.id=res.id;
      _hospitalService.getMedById(res.id).subscribe((res)=>{
        this.mData=res.sensitivities;
        console.log(this.mData.length);

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
   }
   error:any;
   mData:any;
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
      medicalHistoryId:new FormControl(0,[])
    });

    submitForm(myForm:FormGroup){
      // console.log(myForm.value);
      this._hospitalService.addNewSensitivitie(myForm.value,this.id).subscribe(
        (res)=>{
          // console.log(res);
          let currentUrl = this._router.url;
          this._router.routeReuseStrategy.shouldReuseRoute = () => false;
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate([currentUrl]);
        },
        (err)=>{
          // console.log(err);
        }
      )
    }
    delete(id:any){
      this._hospitalService.deleteSensitivity(id).subscribe((res)=>{
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
  }

}
