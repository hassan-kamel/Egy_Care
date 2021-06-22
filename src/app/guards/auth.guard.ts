import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router}  from '@angular/router';
import  {AuthService}  from '../../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


constructor(public _AuthService:AuthService , public _Router:Router) {


}



canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  if (this._AuthService.isUserAuthenticated()) {
    return true;
  }
  this._Router.navigate(['login'], { queryParams: { returnUrl: state.url }});
  return false;
}




}
