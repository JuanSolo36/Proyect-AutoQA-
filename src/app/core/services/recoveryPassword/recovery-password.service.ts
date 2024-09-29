import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecoveryPassword } from '../../models/recoveryPassword/recoveryPassword.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {

  constructor(private http: HttpClient) {}
  recoveryPasswordUser(userRequest:any): Observable<any> {
    return this.http.post(environment.REST_API_URL_BASE +'/code/password', JSON.stringify(userRequest));
  }
}
