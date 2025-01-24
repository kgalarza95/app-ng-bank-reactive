import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  login() {
    // Simulación de inicio de sesión exitoso/SOLO DESARROLLO
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
  }
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
