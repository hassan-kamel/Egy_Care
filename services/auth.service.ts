import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  base='http://mohamednabiil-001-site1.ctempurl.com';

  constructor(private _http: HttpClient, private _jwtHelper: JwtHelperService  , private  _JwtHelperService:JwtHelperService) { }


  public isUserAuthenticated = (): any => {
    const token = localStorage.getItem("token");
    return token && !this._jwtHelper.isTokenExpired(token);
  }


  public isUserAdmin = ():boolean=>{
    const token:any  = localStorage.getItem('token');
    const decodedToken = this._JwtHelperService?.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log(role);
    return role === 'Admin';
}

public isUserHospital = ():boolean=>{
  const token:any  = localStorage.getItem('token');
  const decodedToken = this._JwtHelperService.decodeToken(token);
  const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  return role === 'hospital';
}

loginAdmin(body:any){
  return this._http.post(`${this.base}/api/ApplicationUser/Login`, body)
}
public logout(){
  localStorage.removeItem('token');
}


}
