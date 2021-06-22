import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService  , private  _JwtHelperService:JwtHelperService) { }


  public isUserAuthenticated = (): any => {
    const token = localStorage.getItem("token");
    return token && !this._jwtHelper.isTokenExpired(token);
  }


  public isUserAdmin = ():boolean=>{
    const token:any  = localStorage.getItem('token');
    const decodedToken = this._JwtHelperService.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role === 'Admin';
}

public isUserHospital = ():boolean=>{
  const token:any  = localStorage.getItem('token');
  const decodedToken = this._JwtHelperService.decodeToken(token);
  const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  return role === 'hospital';
}


public logout(){
  localStorage.removeItem('token');
}


}
