import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService}   from '../../../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class HospitalGuard implements CanActivate {

  constructor(public _AuthService:AuthService ,public _Router:Router ) {


  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this._AuthService.isUserHospital())
      return true;
    this._Router.navigate(['/forbideen'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
