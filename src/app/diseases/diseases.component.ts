import { fading } from './../animations/fading';
import { HospitalService } from './../../../services/hospital.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.scss'],
  animations:[fading]
})
export class DiseasesComponent implements OnInit {

  constructor(public _activatedRoute:ActivatedRoute,public _hospitalService:HospitalService, public _router:Router ) {
    let ssn=this._activatedRoute.snapshot.parent?.params.ssn;
    // console.log(ssn);
    _hospitalService.getPatientBySsn(ssn).subscribe((res)=>{
      // console.log(res.id);
      this.id=res.id;

      _hospitalService.getMedById(res.id).subscribe((res)=>{
        // console.log(res.diseases);
        this.mData=res.diseases;
        console.log(this.mData)
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
     cause: new FormControl(null,[]),
     medicalHistoryId:new FormControl(0,[])
   });

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
   delete(id:any){
    this._hospitalService.deleteDisease(id).subscribe((res)=>{
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
