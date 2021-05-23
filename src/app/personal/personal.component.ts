import { fading } from './../animations/fading';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from 'services/hospital.service';

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
  constructor(public _activatedRoute:ActivatedRoute,public _hospitalService:HospitalService) {
    let ssn=this._activatedRoute.snapshot.parent?.params.ssn;
    this.pSsn=ssn;
    // console.log(ssn);
    _hospitalService.getPatientBySsn(ssn).subscribe((res)=>{
      // console.log(res);
      this.pData=res;
      this.pAge=2021-Number(res.dateOfBirth.substring(0,4));
    }
    ,
    (err)=>{
      // console.log(err);
    }
    );
   }

  ngOnInit(): void {
  }

}
