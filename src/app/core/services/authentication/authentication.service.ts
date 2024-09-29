import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../../models/user/loginUserResponse';
import { ResponseQROPT } from '../../models/responseQROPT';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  
  login(userRequest: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      environment.REST_API_URL_BASE + 
      '/authenticate',
      userRequest,
    );
    
  }
  authOTP(userRequest: { email: string; totpCode: string }): Observable<any> {
   
    return this.http.post<LoginResponse>(
      environment.REST_API_URL_BASE + 
      '/authenticate/totp',
      userRequest,
    );
    
  }

  recoveryCodeOTP(email: string): Observable<ResponseQROPT> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain', // Configura el tipo de contenido como texto plano
      })
    };
    const emailPayload = `"${email}"`;

    return this.http.post<ResponseQROPT>(
      environment.REST_API_URL_BASE + 
      '/code/qr',
      emailPayload,
      options
    );
    
  }
  loginPasword(userRequest: { email: string; password: string }): Observable<any> {

    return this.http.post(
      environment.REST_API_URL_BASE + 
      '/authenticate',
      userRequest
    );
  }
}
