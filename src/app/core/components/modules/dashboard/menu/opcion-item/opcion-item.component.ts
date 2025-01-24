import { Component, EventEmitter, input, output } from '@angular/core';
import { OptionItem } from '../../../../../model/dto/optionitem';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-opcion-item',
  imports: [CommonModule, RouterLink],
  templateUrl: './opcion-item.component.html',
  styleUrl: './opcion-item.component.scss'
})
export class OpcionItemComponent {
  activeMenu: string | null | undefined = 'project';

  item = input<OptionItem>();
  eventActiveMenu = output<string | undefined>();

  constructor() { }


  setActiveMenu(menu: string | undefined) {
    this.activeMenu = menu;
    this.eventActiveMenu.emit(menu);
  }
}
