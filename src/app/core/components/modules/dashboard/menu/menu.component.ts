import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OptionItem } from '../../../../model/dto/optionitem';
import { OpcionItemComponent } from "./opcion-item/opcion-item.component";
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { MenuItem } from '../../../../model/dto/menuitem';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, OpcionItemComponent, MenuItemComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  menuOptions: OptionItem[] = [
    {
      routerLink: '/users',
      iconClass: 'fas fa-users',
      label: 'Users',
      activeMenu: 'users'
    },
    {
      routerLink: '/roles',
      iconClass: 'fas fa-user-tag',
      label: 'Roles',
      activeMenu: 'roles'
    }
  ];

  menuOptions2: OptionItem[] = [
    {
      routerLink: '/customer',
      iconClass: 'fas fa-user-tie',
      label: 'Customer',
      activeMenu: 'customer'
    },
    {
      routerLink: '/account',
      iconClass: 'fas fa-wallet',
      label: 'Account',
      activeMenu: 'account'
    },
    {
      routerLink: '/transaction',
      iconClass: 'fas fa-exchange-alt',
      label: 'Transaction',
      activeMenu: 'transaction'
    }
  ];

  menuItem1: MenuItem = { subtitle: 'System Administration', title: 'ADMINISTRATION' };
  menuItem2: MenuItem = { subtitle: 'Banking Menu', title: 'APPLICATIONS' };

  activeMenu: string | null | undefined = 'project';

  setActiveMenu(menu: string | undefined) {
    this.activeMenu = menu;
  }

}
