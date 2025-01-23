import { Component } from '@angular/core';
import { LoginService } from '../../../services/security/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  constructor(private authService: LoginService, private router: Router) { }

  activeMenu: string | null = 'project';
  ecommereceSubmenuOpen = false;
  helpSubmenuOpen = false;

  setActiveMenu(menu: string) {
    this.activeMenu = menu;
    this.ecommereceSubmenuOpen = false;
    this.helpSubmenuOpen = false;
  }

  toggleSubmenu(submenu: 'ecommerce' | 'help') {
    if (submenu === 'ecommerce') {
      this.ecommereceSubmenuOpen = !this.ecommereceSubmenuOpen;
      this.helpSubmenuOpen = false;
    } else if (submenu === 'help') {
      this.helpSubmenuOpen = !this.helpSubmenuOpen;
      this.ecommereceSubmenuOpen = false;
    }
  }
  logout() {
    this.authService.logout()
    this.router.navigate(['/auth/login'])
  }
}
