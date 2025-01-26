import { Component } from '@angular/core';
import { ContainerComponent } from '../../../util/container/container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  imports: [ContainerComponent, CommonModule, FormsModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent {
  saldo: number = 1500.00;  // Saldo global
  transactions: any[] = [];

  transactionActions = [
    { name: 'Depósito desde sucursal', cost: 0, amount: 0 },
    { name: 'Depósito desde cajero automático', cost: 2, amount: 0 },
    { name: 'Depósito desde otra cuenta', cost: 1.5, amount: 0 },
    { name: 'Compra en establecimiento físico', cost: 0, amount: 0 },
    { name: 'Compra en página web (con seguro)', cost: 5, amount: 0 },
    { name: 'Retiro en cajero automático', cost: 1, amount: 0 },
  ];

  performTransaction(action: any) {
    const transaction = {
      date: new Date(),
      operation: action.name,
      amount: action.amount,
      cost: action.cost
    };

    this.transactions.push(transaction);
    this.saldo += action.amount - action.cost;
  }
}
