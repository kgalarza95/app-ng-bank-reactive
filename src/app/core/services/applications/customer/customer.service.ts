import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../../model/customer';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUri = '/customers';

  constructor(private http: HttpClient) { }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${environment.apiUrl}${this.apiUri}`, customer).pipe(
      catchError((error) => {
        console.error('Error en createCustomer:', error);
        return throwError(() => error.error || { message: 'Error desconocido', status: error.status });
      })
    );
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${environment.apiUrl}${this.apiUri}`, customer).pipe(
      catchError((error) => {
        console.error('Error en updateCustomer:', error);
        return throwError(() => error.error || { message: 'Error desconocido', status: error.status });
      })
    );
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${environment.apiUrl}${this.apiUri}`).pipe(
      tap(customers => console.log('customers cargados', customers)),
      catchError(this.handleError<Customer[]>('getCustomers', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T); // Devuelve un valor de tipo T en caso de error
    };
  }
}
