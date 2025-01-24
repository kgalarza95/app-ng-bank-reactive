import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

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
}
