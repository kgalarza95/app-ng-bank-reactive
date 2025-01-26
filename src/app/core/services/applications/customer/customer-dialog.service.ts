import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../../../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerDialogService {

  private customerSource = new BehaviorSubject<Customer | null>(null);
  customer$ = this.customerSource.asObservable();

  private isActiveSource = new BehaviorSubject<boolean>(false);
  isActive$ = this.isActiveSource.asObservable();

  sendCustomer(customer: Customer | null) {
    this.customerSource.next(customer);
  }

  sendIsActive(isActive: boolean) { 
    this.isActiveSource.next(isActive);
  }
}
