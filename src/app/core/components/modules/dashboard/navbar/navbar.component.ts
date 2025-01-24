import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { UserProfileDropdownComponent } from "./user-profile-dropdown/user-profile-dropdown.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from '../../../../services/util/breadcrum.service';

@Component({
  selector: 'app-navbar',
  imports: [UserProfileDropdownComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuOpen = false;
  @Output() toggleMenuOut = new EventEmitter<void>();
  isDropdownOpen = false;

  breadcrumbText: string = 'Dashboard';
  private breadcrumbSubscription: Subscription | undefined;

  constructor(private breadcrumbService: BreadcrumbService) { }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.isDropdownOpen && !target.closest('.navbar__user')) {
      this.isDropdownOpen = false;
    }
  }

  onClickToggleMenu() {
    this.toggleMenuOut.emit()
  }

  ngOnInit(): void {
    this.breadcrumbSubscription = this.breadcrumbService.breadcrumb$.subscribe(text => {
      this.breadcrumbText = text;
    });

  }
  ngOnDestroy(): void {
    if (this.breadcrumbSubscription) {
      this.breadcrumbSubscription.unsubscribe();
    }
  }

}
