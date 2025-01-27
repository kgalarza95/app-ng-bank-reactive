import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() text: string = '';
  @Input() icon: string = ''; 
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() style: 'solid' | 'outlined' = 'solid';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() color: string = 'primary'; 
  @Input() disabled: boolean = false;


  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
