import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth:AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (next.data.role == 'caster'){
      if(this.auth.getCaster()){
        return true;
      }
    } else if (next.data.role == undefined || next.data.role == null){
      if (this.auth.getAdmin()){
        return true;
      }
    }else if (this.auth.getAdmin().indexOf(next.data.role)>-1){
      return true;
    }
    // navigate to login page
    this.router.navigate(['/noAccess/', next.data.role]);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
