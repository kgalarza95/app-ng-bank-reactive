import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() options: { value: any, label: string }[] = [];
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() selectedValue: any = null;
  @Output() selectedValueChange = new EventEmitter<any>();

  isOpen = false;
  filterText = '';
  filteredOptions: { value: any, label: string }[] = [];
  selectedLabel: string = '';

  ngOnInit() {
    this.filteredOptions = this.options; 
    this.updateSelectedLabel();
  }

  onChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedValue = target.value;
    this.selectedValueChange.emit(this.selectedValue);
  }


  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.filterText = '';
      this.filterOptions();
    }
  }

  selectOption(option: { value: any, label: string }) {
    this.selectedValue = option.value;
    this.selectedValueChange.emit(this.selectedValue);
    this.updateSelectedLabel(); 
    this.isOpen = false;
  }


  filterOptions() {
    if (!this.filterText) {
      this.filteredOptions = this.options;
      return;
    }
    this.filteredOptions = this.options.filter(option =>
      option.label.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  updateSelectedLabel() {
    this.selectedLabel = this.selectedValue
      ? this.options.find(o => o.value === this.selectedValue)?.label || ''
      : this.placeholder;
  }
}
