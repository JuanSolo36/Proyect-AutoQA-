import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { User } from '../../models/user/loginUserResponse';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  isAuthorized: boolean = false;
  private authSource = new Subject<boolean>();
  authChallenge$ = this.authSource.asObservable();
  user?: any;
  survey: string | null = null;
  name: string = '';

  constructor(private storageService: StorageService, private router: Router) {
    this.survey = this.storageService.retrieve('survey');
    this.name = this.storageService.retrieve('dataUserName') ?? '';

    if (this.storageService.retrieve('isAuthorized') !== '') {
      this.isAuthorized = this.storageService.retrieve('isAuthorized');
      this.user = this.storageService.retrieve('userData');
      this.authSource.next(true);
    }
  }

  public GetToken(): string {
      return atob(this.storageService.retrieve('token'));
  }

  async LogOff() {
    this.ResetAuthData();
    this.authSource.next(false);
    this.router.navigate(['/auth']);
  }

  public ResetAuthData() {
    this.storageService.store('userData', '');
    this.storageService.store('token', '');
    this.isAuthorized = false;
    this.storageService.store('isAuthorized', false);
    this.survey = '';
    this.name = '';
    if (this.isSessionStorageAvailable()) {
      sessionStorage.clear();
    }
  }

  public SaveUserAndToken(loginResponse: any) {
    this.user = loginResponse.user;
    this.storageService.store('token', btoa(loginResponse.token));
    this.storageService.store('userData', btoa(JSON.stringify(loginResponse.user)));
  }
  public setAuthorized(){
    this.isAuthorized = true;
    this.storageService.store('isAuthorized', true);
  }

  public GetDataUser(): User | undefined {
    if (this.isSessionStorageAvailable() && sessionStorage.getItem('userData')) {
        return JSON.parse(atob(this.storageService.retrieve('userData')));
    }
    return undefined;
}
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  private isSessionStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
