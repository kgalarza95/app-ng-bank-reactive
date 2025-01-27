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
import { CustomerService } from '../../../../../services/applications/customer/customer.service';
import { ConfirmationDialogComponent } from '../../../../util/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dialog-customer',
  imports: [ConfirmationDialogComponent, CommonModule, ButtonComponent, InputFloatComponent, ReactiveFormsModule, InputComponent, NotificationComponent],
  templateUrl: './dialog-customer.component.html',
  styleUrl: './dialog-customer.component.scss'
})
export class DialogCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer | null = null;
  private subscription: Subscription;

  @Output() closeDialog = new EventEmitter<void>();
  isActive: boolean = false;
  TYPE_OPERATION: string | null = null;

  isDialogOpen = false;

  constructor(private fb: FormBuilder,
    private customerDialogService: CustomerDialogService,
    private notificationService: NotificationService,
    private customerService: CustomerService
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

    this.customerDialogService.typeOperation$.subscribe((typeOperation) => {
      this.TYPE_OPERATION = typeOperation;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  onSubmit() {
    if (this.customerForm.valid) {
      this.isDialogOpen = true;
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

  onConfirm() {
    this.isDialogOpen = false;
    const customerData = this.customerForm.value;

    if (this.TYPE_OPERATION === 'E' && this.customer) {
      const updatedCustomerData = { ...customerData, aggregateId: this.customer.id };

      this.customerService.updateCustomer(updatedCustomerData).subscribe(
        (updatedCustomer) => {
          console.log('Cliente actualizado con éxito:', updatedCustomer);
          this.showToast('Cliente actualizado con éxito', 'success');
          this.customerDialogService.emitRefreshTable();
          this.onClose();
        },
        (error) => {
          const errorMessage = error.message || 'Hubo un error al actualizar el cliente';
          console.log('Error al actualizar el cliente:', error);
          this.showToast(errorMessage, 'warning');
        }
      );
    } else if (this.TYPE_OPERATION === 'C') {
      this.customerService.createCustomer(customerData).subscribe(
        (newCustomer) => {
          console.log('Cliente creado con éxito:', newCustomer);
          this.showToast('Cliente creado con éxito', 'success');
          this.customerDialogService.emitRefreshTable();
          this.onClose();
        },
        (error) => {
          const errorMessage = error.message || 'Hubo un error al crear el cliente';
          console.log('Error al crear el cliente:', error);
          this.showToast(errorMessage, 'warning');
        }
      );
    }
  }

  onCancel() {
    this.isDialogOpen = false;
    this.onClose();
  }

}
