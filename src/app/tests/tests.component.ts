import { fading } from './../animations/fading';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HospitalService } from 'services/hospital.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  form: any;
  myFiles: any[] = [];
  id: any;
  opened: any =false;
  bigSrc: any;

  constructor(public _activatedRoute:ActivatedRoute,public _hospitalService:HospitalService,public _router:Router, private fb: FormBuilder) {
    let ssn=this._activatedRoute.snapshot.parent?.params.ssn;
    this.form = this.fb.group({
      Files: ['', Validators.required],
      Name: ['', Validators.required],
      Date: ['', Validators.required],

    })
    // console.log(ssn);
    _hospitalService.getPatientBySsn(ssn).subscribe((res)=>{
      this.id=res.id;
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


   public uploadFile = (event: any) => {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }


  onSubmit() {
    const formData = new FormData();
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("Files", this.myFiles[i]);
    }
    formData.append("Name", this.form.get('Name')?.value);
    formData.append("Date", this.form.get('Date')?.value);
    console.log(formData);
    this._hospitalService.addNewTest(formData,this.id).subscribe(
      (res => {
        // console.log('Hello world');
        console.log(res);
        let currentUrl = this._router.url;
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate([currentUrl]);
      }
      ),
      (err) => {
        console.log(err);
      //  this.form.reset();
      }
    )
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

  open(img:any,idx:any){
    let bigImg=document.getElementsByClassName("big");
    this.bigSrc="http://mohamednabiil-001-site1.ctempurl.com/"+img;
    // bigImg[idx]?.setAttribute("src",`'http://mohamednabiil-001-site1.ctempurl.com/${img}`);
    // console.log(idx);
    console.log(bigImg);
    this.opened=true;
  }
  close(e:any){
    console.log(e);
    if(e.path.length==14){
      this.opened=false
    }
  }
  closeByX(){
    this.opened=false

  }
}
