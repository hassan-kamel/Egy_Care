import { HospitalService } from './../../../services/hospital.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';


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



  constructor(_hospitalService:HospitalService) {
  _hospitalService.getAllHospital().subscribe(
    (response)=>{
      this.hospitalsConfirm=response;
      console.log(this.hospitalsConfirm);
      console.log(this.hospitalsConfirm[0].files[0].filePath);

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
  getFilePath(index:number,idxOfFile:number){
    let fullPath=this.hospitalsConfirm[index].files[idxOfFile].filePath;
    console.log(fullPath);
    for(let i=fullPath.length-1;i>0;i--){
      if(fullPath[i]=='\\'){
        this.filePath=fullPath.substring(i+1);
        console.log(this.filePath);
        break;
      }
    }
  }



  ngOnInit(): void {

  }

}
