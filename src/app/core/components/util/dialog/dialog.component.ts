import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ElementRef, Renderer2, Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Input() closeable: boolean = true;
  @Input() width: string = '400px';
  @Output() close = new EventEmitter<void>();



  handleClose() {
    if (this.closeable) {
      this.close.emit();
    }
  }


  onClickOutside(event: Event) {
    if (this.closeable && (event.target === this.elementRef.nativeElement)) {
      this.close.emit();
    }
  }


  constructor(private elementRef: ElementRef) { }
}
