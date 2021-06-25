import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from 'services/auth.service';
import { HospitalService } from 'services/hospital.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  hospitalID: any;



  constructor(public _AuthService:AuthService , public _Router:Router ,public _activatedRoute:ActivatedRoute,public _hospitalService:HospitalService, public _router:Router ) {

    // this.hospitalID= this._Router.url.slice(6,7);

    this._activatedRoute.paramMap.subscribe((params:ParamMap)=>{
      this._hospitalService.GetHospitalData(params.get('id'))
      .subscribe(( res)=>{
        this.hospitalData = res;
        this.hospitalID=this.hospitalData.id;
        console.log(this.hospitalData);

      })
    });

  }

  ssn:any;
  addClicked:boolean=false;
  id:any;
  searchErr:any;
  addMedical:boolean=false;
  patientID:any;
  addedSsn:any;
  hospitalData:any;


  add(){
    this.addClicked=true;
  }
  desAdd(){
    this.addClicked=false;
  }
  desAddMedical(){
    this.addMedical=false;
  }
  medicalForm=new FormGroup({
    bloodType:new FormControl(null,[]),
  });
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
    console.log(myForm.value);
    this.addedSsn=myForm.value.patientSSN;
    this._hospitalService.addNewPatient(myForm.value).subscribe(
      (res)=>{
        this._hospitalService.getPatientBySsn(myForm.value.patientSSN).subscribe((res)=>{
          // console.log(res);
          this.addMedical=true;
          this.patientID=res.id;
        }
        ,
        (err)=>{
          console.log(err);

        }
        );
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  submitMedical(myForm:FormGroup){
    console.log(this.patientID);
    this._hospitalService.addMedData(myForm.value,this.patientID).subscribe((res)=>{
      // console.log(res);
        let currentUrl = this._router.url;
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        // console.log(currentUrl);
        this._router.navigateByUrl(`home/${this.hospitalID}/patient/${this.addedSsn}/personal`);
      },
    (err)=>{
      console.log(err);
    });
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
     this._router.navigateByUrl(`home/${this.hospitalID}/patient/${this.addedSsn}/personal`);
    }
   }

   logout(){
    this._AuthService.logout();
    this._Router.navigate(['/login']);
    }


    ngOnInit(): void {
      // this._activatedRoute.paramMap.subscribe((params:ParamMap)=>{
      //  //this.Id = params.get('id');


      //  this._hospitalService.GetHospitalData(params.get('id'))
      //  .subscribe(( res)=>{
      //    this.hospitalData = res;

      //  })


      // })



       }

}
