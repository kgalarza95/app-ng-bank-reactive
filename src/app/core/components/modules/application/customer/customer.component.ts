import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContainerComponent } from '../../../util/container/container.component';
import { DynamicTableComponent } from '../../../util/dynamic-table/dynamic-table.component';
import { ButtonComponent } from '../../../util/button/button.component';
import { DialogComponent } from '../../../util/dialog/dialog.component';
import { DialogCustomerComponent } from './dialog-customer/dialog-customer.component';
import { Customer } from '../../../../model/customer';
import { CustomerDialogService } from '../../../../services/applications/customer/customer-dialog.service';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../../../services/applications/customer/customer.service';

@Component({
  selector: 'app-customer',
  imports: [ContainerComponent, DynamicTableComponent, ButtonComponent, DialogComponent, DialogCustomerComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit, OnDestroy {

  customerSelected: Customer = {};

  columns = [
    { key: 'identification', label: 'Identification', sortable: true, hidden: false },
    { key: 'firstName', label: 'First Name', sortable: true, hidden: false },
    { key: 'lastName', label: 'Last Name', sortable: true, hidden: true },
    { key: 'email', label: 'Email', sortable: true, hidden: true },
    { key: 'phone', label: 'Phone', sortable: true, hidden: true },
    { key: 'address', label: 'Address', sortable: true, hidden: true },
    { key: 'birthDate', label: 'Birth Date', sortable: true, hidden: false },
  ];



  loading = false;
  disableInputs: boolean = true;

  error = null;
  private subscription = new Subscription();
  data: Customer[] = [];

  showDialog = false;

  constructor(private customerDialogService: CustomerDialogService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
    this.subscription.add(
      this.customerDialogService.refreshTable$.subscribe(() => {
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
    this.subscription.add(this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.data = customers;
      },
      error: (error) => {
        this.error = error;
      },
      complete: () => {
        this.loading = false;
      }

    }));

  }

  abrirDialogo(customer?: Customer) {
    this.customerSelected = customer || {};
    this.showDialog = true;
    this.customerDialogService.sendCustomer(customer || null);
  }

  onInformation(event: any) {
    this.customerDialogService.sendIsActive(true);
    this.customerDialogService.sndTypeOperation("I");
    this.abrirDialogo(event);
  }

  onCreate() {
    this.customerDialogService.sendIsActive(false);
    this.customerDialogService.sndTypeOperation("C");
    this.abrirDialogo();
  }

  onEdit(event: any) {
    this.customerDialogService.sendIsActive(false);
    this.customerDialogService.sndTypeOperation("E");
    this.abrirDialogo(event);
  }

  onDelete(event: any) {
    console.table(event);
  }
}
