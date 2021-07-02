import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { HospitalService } from 'services/hospital.service';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss']
})
export class HomeSearchComponent implements OnInit {
  ssn:any;

  hospitalID: any;
  constructor(public _AuthService:AuthService , public _Router:Router ,public _activatedRoute:ActivatedRoute,public _hospitalService:HospitalService, public _router:Router ) {
    this.hospitalID= this._Router.url.slice(6,this._Router.url.length-7);
    console.log(this.hospitalID);
    };


  ngOnInit(): void {
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

}
