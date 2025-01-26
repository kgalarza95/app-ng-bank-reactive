import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../../../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerDialogService {

  private customerSource = new BehaviorSubject<Customer | null>(null); 
  customer$ = this.customerSource.asObservable();

  sendCustomer(customer: Customer | null) {
    this.customerSource.next(customer);
  }
}
