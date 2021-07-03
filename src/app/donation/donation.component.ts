import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { HospitalService } from './../../../services/hospital.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],
})
export class DonationComponent implements OnInit {
  form: FormGroup;
  notifactionSent: boolean = false;
  constructor(
    public _Router: Router,
    private fb: FormBuilder,
    public _activatedRoute: ActivatedRoute,
    public _hospitalService: HospitalService,
    public _router: Router
  ) {
    // console.log(this._Router.url.slice(6,this._Router.url.length-9));
    this.form = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      bloodType: ['', Validators.required],
      city: ['', Validators.required],
      patientName: ['', Validators.required],
      numberOfBags: ['', Validators.required],
    });
  }
  Id: any;
  Data:any;
  city:any;
  ngOnInit(): void {
    let x = this._router.url;
    this.Id = x.slice(6, x.length - 9);
    this._hospitalService.GetHospitalData(this.Id)
    .subscribe(res=>{
      this.Data = res;
      this.city=this.Data.location;

    })
  }

  onSubmit() {
    var body = {
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value,
      bloodType: this.form.get('bloodType')?.value,
      //city: this.form.get('city')?.value,
      city:this.city,
      patientName: this.form.get('patientName')?.value,
      numberOfBags: this.form.get('numberOfBags')?.value,
    };
    console.log(body);

    this._hospitalService.donation(body, this.Id).subscribe(
      (res) => {

          this.notifactionSent = true;
          this.form.reset();
          setTimeout(() => {
            this.notifactionSent = false;
          }, 3000);

      },
      (err) => {
        alert('no user found to send notfiactions');
      }
    );





  }
}
