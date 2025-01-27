import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../../util/container/container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectComponent } from '../../../util/select/select.component';
import { ButtonComponent } from '../../../util/button/button.component';
import { DynamicTableComponent } from '../../../util/dynamic-table/dynamic-table.component';
import { AccountService } from '../../../../services/applications/account/account.service';
import { Account } from '../../../../model/account.model';
import { TransactionService } from '../../../../services/applications/transaction/transaction.service';
import { TransactionResponse } from '../../../../model/transaction-resp.model';
import { TransactionRequest } from '../../../../model/transaction-req.model';
import { delay, Observable, of } from 'rxjs';
import { NotificationComponent } from '../../../util/notification/notification.component';
import { NotificationService } from '../../../util/notification/notification.service';
import { ConfirmationDialogComponent } from '../../../util/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-transaction',
  imports: [ContainerComponent, CommonModule, FormsModule, SelectComponent, ButtonComponent, DynamicTableComponent, NotificationComponent, ConfirmationDialogComponent],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit {

  columns = [
    { key: 'date', label: 'Date', sortable: true, hidden: false },
    { key: 'transactionType', label: 'Transaction Type', sortable: true, hidden: false },
    { key: 'amount', label: 'Amount', sortable: true, hidden: false },
    { key: 'tax', label: 'Cost', sortable: true, hidden: false },
  ];

  data: TransactionResponse[] = [];

  isDialogOpen = false;
  accounts: Account[] = [];
  accountDetails: Account | null = null;
  options: { value: string, label: string }[] = [];
  selectedValuePredefine?: string;
  idAccountSelected?: string;

  saldo: number = 0.00;
  transactions: any[] = [];

  transactionActions = [
    { name: 'Deposit from branch', cost: 0, amount: 0, transactionKey: 'B' },
    { name: 'Deposit from ATM', cost: 2, amount: 0, transactionKey: 'A' },
    { name: 'Deposit from another account', cost: 1.5, amount: 0, transactionKey: 'C' },
    { name: 'In-store purchase', cost: 0, amount: 0, transactionKey: 'P' },
    { name: 'Online purchase', cost: 5, amount: 0, transactionKey: 'O' },
    { name: 'ATM withdrawal', cost: 1, amount: 0, transactionKey: 'W' },
  ];
  transactionSelected: any;

  constructor(private accountService: AccountService,
    private notificationService: NotificationService,
    private transactionService: TransactionService) {

  }

  performTransaction(action: any) {
    this.isDialogOpen = true;
    this.transactionSelected = action;
    console.log(this.isDialogOpen);
  }


  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((data) => {
      this.options = data.map(account => ({
        value: account.customerId as string,
        label: account.name as string
      }));

    });
  }

  onAccountChange(newValue: any): void {
    this.idAccountSelected = newValue;
    this.getAccountDetails(newValue);
    this.getTransactions(newValue);
  }

  private getAccountDetails(accountId?: string): void {
    this.accountService.getAccountById(accountId).subscribe(
      (data) => {
        this.accountDetails = data;
        this.saldo = data.balance as number;
      },
      (error) => {
        this.showToast('Error retrieving account details', 'error');

      }
    );
  }

  private getTransactions(accountId?: string): void {
    this.transactionService.getTransactions(accountId).subscribe(
      (dataRep) => {
        this.data = dataRep;
      },
      (error) => {
        this.showToast('Error retrieving transactions', 'error');

      }
    );
  }


  onConfirm() {
    this.isDialogOpen = false;
    const action = this.transactionSelected;
    const accountId = this.idAccountSelected;

    console.log(action.transactionKey);
    const totalAmount = action.amount + action.cost;
    if (['W', 'P', 'O'].includes(action.transactionKey) && this.saldo < totalAmount) {
      this.showToast('Insufficient balance to complete the transaction', 'warning');
      return;
    }

    if (['A', 'B', 'C'].includes(action.transactionKey)) {
      const totalAmount = action.amount + this.saldo;
      if (totalAmount < action.cost) {
        this.showToast('Insufficient balance to cover the deposit amount and transaction fee', 'warning');
        return;
      }
    }

    const transactionRequest: TransactionRequest = {
      description: action.name,
      amount: action.amount,
      accountId: accountId
    };

    this.transactionService.makeTransaction(action.transactionKey, transactionRequest).subscribe({
      next: (response) => {
        console.log('Transaction successful:', response);

        this.getAccountDetails(accountId);
        this.getTransactions(accountId);

        this.resetInputFields();

        this.send(1000).subscribe(() => {
          this.getTransactions(accountId);
        });
      },
      error: (error) => {
        console.error('Transaction failed:', error);
        this.showToast('Transaction failed. Please try again later.', 'error');
      }
    });
  }

  onCancel() {
    this.isDialogOpen = false;
  }

  resetInputFields() {
    this.transactionActions.forEach(action => {
      action.amount = 0;
    });
  }

  send(ms: number): Observable<void> {
    return of(undefined).pipe(delay(ms));
  }

  showToast(messageToast: string, typeToast?: 'success' | 'error' | 'warning' | 'info') {
    this.notificationService.show({
      message: messageToast,
      type: typeToast,
      duration: 3000
    });
  }
}
