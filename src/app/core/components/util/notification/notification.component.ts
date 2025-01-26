import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, ToastConfig } from './notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit, OnDestroy {
  currentToast: ToastConfig | null = null;
  private subscription: Subscription;
  private timer: any;

  constructor(private toastService: NotificationService) {
    this.subscription = this.toastService.toast$.subscribe(toast => {
      this.handleToast(toast);
    });
  }

  ngOnInit() { }

  handleToast(toast: ToastConfig | null) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.currentToast = toast;

    if (toast) {
      this.timer = setTimeout(() => {
        this.close();
      }, toast.duration || 5000);
    }
  }

  close() {
    this.currentToast = null;
    this.toastService.clear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
