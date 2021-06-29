import { HospitalService } from './../../../services/hospital.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'services/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  hospitalsConfirm: any;
  searchText:any;
  filePath="";
  opened:boolean[]=[false];



  constructor(public _hospitalService:HospitalService , public _router: Router,public _AuthService:AuthService ) {
  _hospitalService.getAllHospital().subscribe(
    (response)=>{
      this.hospitalsConfirm=response;
      console.log(this.hospitalsConfirm);
      console.log(this.hospitalsConfirm[0]?.files[0]?.filePath);

    }
    ,
    (err)=>{
      console.log(err);
    }

  );

  }
  openFile(index: number){
    this.opened![index]=true;
    console.log(this.opened);
  }
  logout(){
    this._AuthService.logout();
    this._router.navigate(['/login']);
    }
  // getFilePath(index:number,idxOfFile:number){
  //   let fullPath=this.hospitalsConfirm[index].files[idxOfFile].filePath;
  //   console.log(fullPath);
  //   for(let i=fullPath.length-1;i>0;i--){
  //     if(fullPath[i]=='\\'){
  //       this.filePath=fullPath.substring(i+1);
  //       console.log(this.filePath);
  //       break;
  //     }
  //   }
  // }



  hospitalData:any;
  onAccept(id:any){
  this._hospitalService.getAcceptecdHospital(id)
  .subscribe((res: any)=>{
   this.hospitalData = res;
    let arr = [];
    for(let  i = 0 ; i < this.hospitalData.files.length ; i++){
     arr.push({filePath:this.hospitalData.files[i].filePath});
    }
    var hopspitalbody = {
     name:this.hospitalData.name,
     location:this.hospitalData.location,
     email:this.hospitalData.email,
     password:this.hospitalData.password,
     files:arr,
   }

   this._hospitalService.RegisterHospital(hopspitalbody)
   .subscribe((res: any)=>{
    console.log("done added")
    let currentUrl = this._router.url;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    // console.log(currentUrl);
    this._router.navigateByUrl(`admin`);
   });
  });


  this._hospitalService.CancelHospital(id)
  .subscribe((res: any)=>{
    console.log("done deleted");
  })
  this._router.navigate(['/admin']);
}



onCancel(id:any){

 this._hospitalService.CancelHospital(id)
 .subscribe((res: any)=>{
   console.log("Hosptal delted");
   let currentUrl = this._router.url;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    // console.log(currentUrl);
    this._router.navigateByUrl(`admin`);
 })
}


  ngOnInit(): void {

  }

}
