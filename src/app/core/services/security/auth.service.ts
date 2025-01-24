import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private userEmailSubject = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmailSubject.asObservable();

  constructor() { }

  login(email: string, password: string) {
    // Simulación de inicio de sesión exitoso/SOLO DESARROLLO
    this.isAuthenticatedSubject.next(true);
    this.userEmailSubject.next(email);
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
}
