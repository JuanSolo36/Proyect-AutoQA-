import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePassword } from '../../models/change-password/changePassword.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) { }

  changePassword(changePassword: ChangePassword): Observable<any>{
    return this.http.post( environment.REST_API_URL_BASE +'/change/password', changePassword);
  }
}
