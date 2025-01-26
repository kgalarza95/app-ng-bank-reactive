import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { TokenModel } from '../../model/token.model';
import { environment } from '../../../environments/environment'
import { UserModel } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private userEmailSubject = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmailSubject.asObservable();
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<TokenModel> {
    const credentials: UserModel = { email, password };

    return this.http.post<TokenModel>(`${environment.apiUrl}/auth/usersadmin/authenticate`, credentials).pipe(
      tap(response => {
        this.token = response.token;
        localStorage.setItem('token', this.token);
        this.isAuthenticatedSubject.next(true);
        this.userEmailSubject.next(email);
      }),
      catchError(error => {
        this.logout();
        return throwError(() => new Error('Error de inicio de sesión'));
      })
    );
  }




  logout() {
    this.isAuthenticatedSubject.next(false);
    this.userEmailSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getEmail(): string | null {
    return this.userEmailSubject.value;
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }
}
