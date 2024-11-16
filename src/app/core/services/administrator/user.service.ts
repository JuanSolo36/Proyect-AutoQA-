import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from '../../models/user/userTable.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(
      environment.REST_API_URL_BASE +
      `/user/get-all`
    );
  }

  createUser(UserRequest: UserRequest) {
    return this.http.post(
      environment.REST_API_URL_BASE +
      `/user/create`,
      UserRequest
    );
  }

  getUserId(id: number): Observable<any> {
    return this.http.get<any>(environment.REST_API_URL_BASE + `/user/get/${id}`);
  }

  updateUser(userRequest: UserRequest, id: string) {
    return this.http.put(
      environment.REST_API_URL_BASE +
      `/user/update/${id}`,
      userRequest
    );
  }  

  disableUser(numberIdentification: string): Observable<any> {
    return this.http.delete(
      environment.REST_API_URL_BASE +
      `/user/disable/${numberIdentification}`
    );
  } 

  deleteUser(numberIdentification: string): Observable<any> {
    return this.http.delete(
      environment.REST_API_URL_BASE +
      `/user/delete/${numberIdentification}`
    );
  } 
}
