import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastConfig {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastSubject = new BehaviorSubject<ToastConfig | null>(null);
  toast$ = this.toastSubject.asObservable();

  show(config: ToastConfig) {
    this.toastSubject.next(config);
  }

  clear() {
    this.toastSubject.next(null);
  }
}
