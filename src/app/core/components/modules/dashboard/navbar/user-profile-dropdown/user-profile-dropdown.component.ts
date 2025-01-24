import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../../services/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile-dropdown',
  templateUrl: './user-profile-dropdown.component.html',
  styleUrls: ['./user-profile-dropdown.component.scss']
})
export class UserProfileDropdownComponent implements OnInit, OnDestroy {
  userEmail: string | null = null;
  private userEmailSubscription: Subscription | undefined;

  constructor(private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userEmailSubscription = this.authService.userEmail$.subscribe(email => {
      this.userEmail = email;
    });
  }

  ngOnDestroy(): void {
    if (this.userEmailSubscription) {
      this.userEmailSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
