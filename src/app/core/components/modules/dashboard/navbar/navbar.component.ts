import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { UserProfileDropdownComponent } from "./user-profile-dropdown/user-profile-dropdown.component";
import { CommonModule } from '@angular/common';

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
  }
  ngOnDestroy(): void {
  }
}
