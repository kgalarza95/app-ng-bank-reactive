import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  @Input() isOpen = false;
  @Input() message = 'Are you sure?';
  @Input() confirmText = 'Yes';
  @Input() cancelText = 'No';
  @Input() title: string = 'Confirmation';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  closeDialog() {
    this.isOpen = false;
  }

  onConfirm() {
    this.confirm.emit();
    this.closeDialog();
  }

  onCancel() {
    this.cancel.emit();
    this.closeDialog();
  }
}
