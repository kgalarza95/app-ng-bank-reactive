import { Component, EventEmitter, input, Input, OnInit, Output, output } from '@angular/core';
import { ButtonComponent } from '../../../../util/button/button.component';
import { InputFloatComponent } from '../../../../util/input-float/input-float.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Customer } from '../../../../../model/customer';
import { CustomerDialogService } from '../../../../../services/applications/customer/customer-dialog.service';
import { Subscription } from 'rxjs';
import { InputComponent } from '../../../../util/input/input.component';

@Component({
  selector: 'app-dialog-customer',
  imports: [CommonModule, ButtonComponent, InputFloatComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './dialog-customer.component.html',
  styleUrl: './dialog-customer.component.scss'
})
export class DialogCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer | null = null;
  private subscription: Subscription;
  @Output() closeDialog = new EventEmitter<void>();



  constructor(private fb: FormBuilder,
    private customerDialogService: CustomerDialogService
  ) {
    this.subscription = new Subscription();
    console.log('llega');
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
    } else {
      console.log('Formulario inválido');
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
}
