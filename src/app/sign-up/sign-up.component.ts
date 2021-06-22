import { Component, OnInit } from '@angular/core';
import {HospitalService}  from '../../../services/hospital.service'
import  {FormBuilder, Validators, FormGroup }   from '@angular/forms'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

       myFiles:any [] = [];
       form: FormGroup;
       constructor(public _HospitalService:HospitalService , private fb: FormBuilder) {
       this.form = this.fb.group({
       Files: ['' , Validators.required] ,
       Name: ['', Validators.required],
       Location: ['' , Validators.required],
       Email: ['' ,  Validators.required],
       Password: ['' , Validators.required],
      })
   }



   get f(){
    return this.form.controls;
  }

  toggleIcon(e: any){
    e.target.classList.toggle('fa-eye-slash');
  }


  ngOnInit(): void {


  }



  public uploadFile = (event:any) => {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
  }

  }



      onSubmit(){
        const  formData = new FormData();
        for (var i = 0; i < this.myFiles.length; i++) {
          formData.append("Files", this.myFiles[i]);
        }
        formData.append("Name",this.form.get('Name')?.value );
        formData.append("Location",this.form.get('Location')?.value );
        formData.append("Email",this.form.get('Email')?.value );
        formData.append("Password",this.form.get('Password')?.value );

        this._HospitalService.UploadHospital(formData).subscribe(
          (res=>{
            console.log('Hello world');
            console.log(res);


            }
          ),
          (err)=>{
            console.log(err);

          }
        )


    }
}
