import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { OptionItem } from '../../../../../model/dto/optionitem';
import { CommonModule } from '@angular/common';
import { OpcionItemComponent } from '../opcion-item/opcion-item.component';
import { MenuItem } from '../../../../../model/dto/menuitem';

@Component({
  selector: 'app-menu-item',
  imports: [CommonModule, OpcionItemComponent],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @ViewChild('liChildElement') liChildElement!: ElementRef;

  menuOptions = input<OptionItem[]>();
  menuItem = input<MenuItem>();
  eventGeneral = output<string | undefined>();
  activeMenu: string | null | undefined = 'project';

  setActiveMenu(menu: string | undefined) {
    this.activeMenu = menu;
    this.eventGeneral.emit(menu);
  }
}
