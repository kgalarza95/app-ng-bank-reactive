import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Account } from '../../../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUri = '/accounts';

  constructor(private http: HttpClient) { }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${environment.apiUrl}${this.apiUri}`, account).pipe(
      catchError((error) => {
        console.error('Error en createAccount:', error);
        return throwError(() => error.error || { message: 'Error desconocido', status: error.status });
      })
    );
  }

  updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(`${environment.apiUrl}${this.apiUri}`, account).pipe(
      catchError((error) => {
        console.error('Error en updateAccount:', error);
        return throwError(() => error.error || { message: 'Error desconocido', status: error.status });
      })
    );
  }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.apiUrl}${this.apiUri}`).pipe(
      tap(Accounts => console.log('Accounts cargados', Accounts)),
      catchError(this.handleError<Account[]>('getAccounts', []))
    );
  }

  getAccountById(customerId?: string): Observable<Account> {
    const payload = { customerId };
    return this.http.post<Account>(`${environment.apiUrl}${this.apiUri}/number`, payload);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
