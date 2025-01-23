import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private tokenService: TokenService) {
  }

  login(username: string, password: string): Observable<boolean> {
    // Simulación de llamada a un API
    if (username === 'admin' && password === 'admin') {
      this.tokenService.setToken('my-fake-token');
      return of(true)
    }
    return throwError(() => new Error('Credenciales incorrectas'))
  }

  logout(): void {
    this.tokenService.removeToken()
  }

  isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }
}
