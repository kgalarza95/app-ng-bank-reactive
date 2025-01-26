import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../../../../model/dto/menuitem';

@Component({
  selector: 'app-menu-item',
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  menuItem = input<MenuItem>();
}
