import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Rol } from '../../models/roles';
import { SecurityService } from '../../services/security-service/security.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): boolean | UrlTree {
    if (
        !this.securityService.GetDataUser() ||
        !this.securityService.GetToken() ||
        !this.securityService.isAuthorized
    ) {
        return true;
    } else {
        console.log(this.securityService.GetDataUser());
        console.log(`LOG valor ${this.securityService.GetDataUser()?.roleId.id}`);
        console.log(this.securityService.GetDataUser()?.roleId);
        if (this.securityService.GetDataUser()?.roleId.id == Rol.Administrator) {
            this.router.navigate(['/administrator/users']);
        } else {
            this.router.navigate(['/auth/login']);
        }
        return false;
    }
}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      !this.securityService.GetDataUser() ||
      !this.securityService.GetToken() ||
      !this.securityService.isAuthorized
    ) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
