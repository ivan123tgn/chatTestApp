import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let flag = true;
    if(!localStorage.getItem('userId')) {
      flag = false;
      this.router.navigateByUrl('');
    }
    return of(flag);
  }
}
