import { fading } from './../animations/fading';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from 'services/hospital.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
  animations:[fading]
})
export class TestsComponent implements OnInit {

  error:any;
  mData:any;
  addClicked: any;
  constructor(public _activatedRoute:ActivatedRoute,public _hospitalService:HospitalService,public _router:Router) {
    let ssn=this._activatedRoute.snapshot.parent?.params.ssn;
    // console.log(ssn);
    _hospitalService.getPatientBySsn(ssn).subscribe((res)=>{
      // console.log(res.id);
      _hospitalService.getMedById(res.id).subscribe((res)=>{
        // console.log(res.tests);
        this.mData=res.tests;
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
   delete(id:any){
    this._hospitalService.deleteTest(id).subscribe((res)=>{
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


  add(){
    this.addClicked=true;
  }
  desAdd(){
    this.addClicked=false;
  }

}
