import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerComponent } from '../../../util/container/container.component';
import { DynamicTableComponent } from '../../../util/dynamic-table/dynamic-table.component';
import { ButtonComponent } from '../../../util/button/button.component';
import { DialogComponent } from '../../../util/dialog/dialog.component';
import { Customer } from '../../../../model/customer';
import { CustomerDialogService } from '../../../../services/applications/customer/customer-dialog.service';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../../../services/applications/customer/customer.service';
import { DialogCustomerComponent } from '../customer/dialog-customer/dialog-customer.component';
import { Account } from '../../../../model/account.model';
import { AccountDialogService } from '../../../../services/applications/account/account-dialog.service';
import { AccountService } from '../../../../services/applications/account/account.service';
import { DialogAccountComponent } from './dialog-account/dialog-account.component';

@Component({
  selector: 'app-account',
  imports: [ContainerComponent, DynamicTableComponent, ButtonComponent, DialogComponent, DialogCustomerComponent, DialogAccountComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  dataSelected: Account = {};

  columns = [
    { key: 'customerId', label: 'Customer ID', sortable: true, hidden: false },
    { key: 'name', label: 'Account Name', sortable: true, hidden: false },
    { key: 'accountNum', label: 'Account Number', sortable: true, hidden: false },
    { key: 'balance', label: 'Balance', sortable: true, hidden: false },
    { key: 'status', label: 'Status', sortable: true, hidden: false },
  ];



  loading = false;
  disableInputs: boolean = true;

  error = null;
  private subscription = new Subscription();
  data: Account[] = [];

  showDialog = false;

  constructor(private accountDialogService: AccountDialogService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
    this.subscription.add(
      this.accountDialogService.refreshTable$.subscribe(() => {
        this.loadCustomers();
      })
    );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadCustomers() {
    this.loading = true;
    this.error = null;
    this.subscription.add(this.accountService.getAccounts().subscribe({
      next: (dataIn) => {
        this.data = dataIn;
      },
      error: (error) => {
        this.error = error;
      },
      complete: () => {
        this.loading = false;
      }

    }));

  }

  abrirDialogo(data?: Account) {
    this.dataSelected = data || {};
    this.showDialog = true;
    this.accountDialogService.sendCustomer(data || null);
  }

  onInformation(event: any) {
    this.accountDialogService.sendIsActive(true);
    this.accountDialogService.sndTypeOperation("I");
    this.abrirDialogo(event);
  }

  onCreate() {
    this.accountDialogService.sendIsActive(false);
    this.accountDialogService.sndTypeOperation("C");
    this.abrirDialogo();
  }

  onEdit(event: any) {
    this.accountDialogService.sendIsActive(false);
    this.accountDialogService.sndTypeOperation("E");
    this.abrirDialogo(event);
  }

  onDelete(event: any) {
    console.table(event);
  }
}
