import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer/cutomer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAllCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      environment.REST_API_URL_BASE + `/customer/get/all`
    );
  }
  deleteCustomer(id: string): Observable<Customer[]> {
    return this.http.delete<Customer[]>(
      environment.REST_API_URL_BASE + `/customer/deleted/${id}`
    );
  }
  createCustomer(customerRequest: any): Observable<Customer> {
    return this.http.post<Customer>(
      `${environment.REST_API_URL_BASE}/customer/create`,
      customerRequest
    );
  }
  
}
