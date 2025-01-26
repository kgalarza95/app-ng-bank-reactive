import { Component, EventEmitter, input, Input, OnInit, Output, output } from '@angular/core';
import { ButtonComponent } from '../../../../util/button/button.component';
import { InputFloatComponent } from '../../../../util/input-float/input-float.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../../../model/customer';
import { CustomerDialogService } from '../../../../../services/applications/customer/customer-dialog.service';
import { Subscription } from 'rxjs';
import { InputComponent } from '../../../../util/input/input.component';
import { NotificationComponent } from '../../../../util/notification/notification.component';
import { NotificationService } from '../../../../util/notification/notification.service';

@Component({
  selector: 'app-dialog-customer',
  imports: [CommonModule, ButtonComponent, InputFloatComponent, ReactiveFormsModule, InputComponent, NotificationComponent],
  templateUrl: './dialog-customer.component.html',
  styleUrl: './dialog-customer.component.scss'
})
export class DialogCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer | null = null;
  private subscription: Subscription;

  @Output() closeDialog = new EventEmitter<void>();
  isActive: boolean = false;


  constructor(private fb: FormBuilder,
    private customerDialogService: CustomerDialogService,
    private notificationService: NotificationService
  ) {
    this.subscription = new Subscription();
    this.customerForm = this.fb.group({
      identification: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscription.add(this.customerDialogService.customer$.subscribe(customer => {
      this.customer = customer;
      this.createForm();
    }));

    this.customerDialogService.isActive$.subscribe((isActive) => {
      this.isActive = isActive;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.showToast('Operación realizada con éxito', 'success');
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
    } else {
      console.log('Formulario inválido');
      this.showToast('Revise que el formulario esté completo', 'warning');
    }
  }

  onClose() {
    this.closeDialog.emit();
  }

  createForm() {
    this.customerForm = this.fb.group({
      identification: [this.customer?.identification || '', Validators.required],
      firstName: [this.customer?.firstName || '', Validators.required],
      lastName: [this.customer?.lastName || '', Validators.required],
      email: [this.customer?.email || '', [Validators.required, Validators.email]],
      phone: [this.customer?.phone || '', Validators.required],
      address: [this.customer?.address || '', Validators.required],
      birthDate: [this.customer?.birthDate || '', Validators.required]
    });
  }

  showToast(messageToast: string, typeToast?: 'success' | 'error' | 'warning' | 'info') {
    this.notificationService.show({
      message: messageToast,
      type: typeToast,
      duration: 3000
    });
  }

}
