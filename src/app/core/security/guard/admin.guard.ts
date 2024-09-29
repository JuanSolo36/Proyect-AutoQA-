import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Rol } from '../../models/roles';
import { NonNullAssert } from '@angular/compiler';
import { SecurityService } from '../../services/security-service/security.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (
      this.securityService.GetDataUser() &&
      this.securityService.GetDataUser()?.roleId.id == Rol.Administrator &&
      this.securityService.GetToken()
    ) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.securityService.GetDataUser() &&
      this.securityService.GetDataUser()?.roleId.id == Rol.Administrator &&
      this.securityService.GetToken() &&
      this.securityService.isAuthorized
    ) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
