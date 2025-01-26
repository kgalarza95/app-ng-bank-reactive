import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, ViewChild, ElementRef, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, fromEvent, takeUntil } from 'rxjs';

@Component({
  selector: 'app-input-float',
  imports: [FormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFloatComponent),
      multi: true,
    },
  ],
  templateUrl: './input-float.component.html',
  styleUrl: './input-float.component.scss'
})
export class InputFloatComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() startIcon: string = '';
  @Input() endIcon: string = '';
  @Input() error: string = '';
  @Input() disabled: boolean = false;

  @ViewChild('inputElement') inputElement!: ElementRef;

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };
  private _value: any = '';
  private unsubscribe$ = new Subject<void>();

  focused: boolean = false;

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: any): void {
    this._value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }



  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    fromEvent(this.inputElement.nativeElement, 'focus')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => { this.setFocused(true) });

    fromEvent(this.inputElement.nativeElement, 'blur')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => { this.setFocused(false) });

  }


  setFocused(isFocused: boolean) {
    this.focused = isFocused || !!this.value;
  }



  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
