import { Injectable } from '@angular/core';
import { Customer } from '../../model/customer';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUri = '/customers';

  constructor(private http: HttpClient) { }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.apiUrl}/${this.apiUri}`, customer);
  }

}
