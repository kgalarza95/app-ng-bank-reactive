import { Component, EventEmitter, input, Input, OnInit, Output, output } from '@angular/core';
import { ButtonComponent } from '../../../../util/button/button.component';
import { InputFloatComponent } from '../../../../util/input-float/input-float.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { InputComponent } from '../../../../util/input/input.component';
import { NotificationComponent } from '../../../../util/notification/notification.component';
import { NotificationService } from '../../../../util/notification/notification.service';
import { Account } from '../../../../../model/account.model';
import { AccountDialogService } from '../../../../../services/applications/account/account-dialog.service';
import { AccountService } from '../../../../../services/applications/account/account.service';
import { ConfirmationDialogComponent } from '../../../../util/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-dialog-account',
  imports: [ConfirmationDialogComponent, CommonModule, ButtonComponent, InputFloatComponent, ReactiveFormsModule, InputComponent, NotificationComponent],
  templateUrl: './dialog-account.component.html',
  styleUrl: './dialog-account.component.scss'
})
export class DialogAccountComponent {
  accountForm: FormGroup;
  account: Account | null = null;
  private subscription: Subscription;

  @Output() closeDialog = new EventEmitter<void>();
  isActive: boolean = false;
  TYPE_OPERATION: string | null = null;

  isDialogOpen = false;

  constructor(private fb: FormBuilder,
    private accountDialogService: AccountDialogService,
    private notificationService: NotificationService,
    private accountService: AccountService
  ) {
    this.subscription = new Subscription();
    this.accountForm = this.fb.group({
      name: ['', Validators.required],
      accountNum: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.subscription.add(this.accountDialogService.account$.subscribe(account => {
      this.account = account;
      this.createForm();
    }));

    this.accountDialogService.isActive$.subscribe((isActive) => {
      this.isActive = isActive;
    });

    this.accountDialogService.typeOperation$.subscribe((typeOperation) => {
      this.TYPE_OPERATION = typeOperation;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  onSubmit() {
    if (this.accountForm.valid) {
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
    this.accountForm = this.fb.group({
      name: [this.account?.name || '', Validators.required],
      accountNum: [this.account?.accountNum || '', Validators.required],
      balance: [this.account?.balance || 0, [Validators.required, Validators.min(0)]]
    });

  }

  showToast(messageToast: string, typeToast?: 'success' | 'error' | 'warning' | 'info') {
    this.notificationService.show({
      message: messageToast,
      type: typeToast,
      duration: 3000
    });
  }

  onConfirmDelete() {
    this.isDialogOpen = false;
    const formData = this.accountForm.value;

    if (this.TYPE_OPERATION === 'E' && this.account) {
      const updatedData = { ...formData, customerId: this.account.customerId };
      this.accountService.updateAccount(updatedData).subscribe(
        (updatedCustomer) => {
          this.showToast('Cliente actualizado con éxito', 'success');
          this.accountDialogService.emitRefreshTable();
          this.onClose();
        },
        (error) => {
          const errorMessage = error.message || 'Hubo un error al actualizar el cliente';
          this.showToast(errorMessage, 'warning');
        }
      );
    } else if (this.TYPE_OPERATION === 'C') {
      this.accountService.createAccount(formData).subscribe(
        (newCustomer) => {
          console.log('Cliente creado con éxito:', newCustomer);
          this.showToast('Cliente creado con éxito', 'success');
          this.accountDialogService.emitRefreshTable();
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

  onCancelDelete() {
    this.isDialogOpen = false;
    this.onClose();
  }
}
