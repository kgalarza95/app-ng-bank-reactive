import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Account } from '../../../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountDialogService {

  private acountSource = new BehaviorSubject<Account | null>(null);
  account$ = this.acountSource.asObservable();

  private isActiveSource = new BehaviorSubject<boolean>(false);
  isActive$ = this.isActiveSource.asObservable();

  private typeOperation = new BehaviorSubject<string | null>(null);
  typeOperation$ = this.typeOperation.asObservable();

  private refreshTableSubject = new Subject<void>();
  refreshTable$ = this.refreshTableSubject.asObservable();


  sendCustomer(account: Account | null) {
    this.acountSource.next(account);
  }

  sendIsActive(isActive: boolean) {
    this.isActiveSource.next(isActive);
  }

  sndTypeOperation(typeOperation: string) {
    this.typeOperation.next(typeOperation);
  }

  emitRefreshTable() {
    this.refreshTableSubject.next();
  }
}
