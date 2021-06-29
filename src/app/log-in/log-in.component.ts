import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  form: FormGroup;
  formhospital: FormGroup;
  res: any;
  admin: any = false;
  hospital: any = true;
  constructor(
    private _FormBuilder: FormBuilder,
    public _Router: Router,
    private _JwtHelperService: JwtHelperService,
    private _jwtHelper: JwtHelperService,
    private authService: AuthService,
    public _HospitalService: HospitalService,
    private _router: Router
  ) {
    this.formhospital = this._FormBuilder.group({
      Email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.form = this._FormBuilder.group({
      patientSSN: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  showAdmin(e: any) {
    this.hospital = false;
    this.admin = true;

    // e.target.classList.toggle("active-link");
    let ad = document.getElementById('admin');
    let hos = document.getElementById('hos');
    ad?.classList.add('active-link');
    hos?.classList.remove('active-link');
  }

  showHospital(e: any) {
    this.hospital = true;
    this.admin = false;
    let ad = document.getElementById('admin');
    let hos = document.getElementById('hos');
    ad?.classList.remove('active-link');
    hos?.classList.add('active-link');
  }

  submitForm() {
    let loginHospital = {
      email: this.formhospital.get('Email')?.value,
      password: this.formhospital.get('password')?.value,
    };

    console.log(loginHospital);

    this._HospitalService.LoginHospital(loginHospital).subscribe(
      (res) => {
        this.res = res;
        const decodedToken = this._JwtHelperService.decodeToken(this.res.token);
        const role =
          decodedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];
        console.log(role);
        this._router.navigate(['/home/' + this.res.id]);
        localStorage.setItem('token', this.res.token);
      },
      (err) => {
        console.log(err);
      }
    );
    this.form.reset();
  }
  toggleIcon(e: any) {
    e.target.classList.toggle('fa-eye-slash');
  }

  data: any;

  submitedForm() {
    let body = {
      patientSSN: this.form.get('patientSSN')?.value,
      password: this.form.get('password')?.value,
    };
    console.log(body);

    this.authService.loginAdmin(body).subscribe((res) => {
      this.data = res;
      const decodedToken = this._JwtHelperService.decodeToken(this.data.token);
      const role =
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
      this._router.navigate(['/admin']);
      console.log(role);
    });
  }

  ngOnInit(): void {}
}
