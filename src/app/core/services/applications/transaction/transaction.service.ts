import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionResponse } from '../../../model/transaction-resp.model';
import { TransactionRequest } from '../../../model/transaction-req.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUri = '/movimientos';
  constructor(private http: HttpClient) { }

  getTransactions(accountId?: string): Observable<TransactionResponse[]> {
    return this.http.post<TransactionResponse[]>(
      `${environment.apiUrl}${this.apiUri}/id`,
      { accountId }
    );
  }

  makeBranchDeposit(request: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(
      `${environment.apiUrl}${this.apiUri}/deposito/sucursal`,
      request
    );
  }

  makeATMDeposit(request: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(
      `${environment.apiUrl}${this.apiUri}/deposito/cajero`,
      request
    );
  }

  makeDepositToAnotherAccount(request: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(
      `${environment.apiUrl}${this.apiUri}/deposito/otra-cuenta`,
      request
    );
  }

  makePhysicalPurchase(request: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(
      `${environment.apiUrl}${this.apiUri}/compra/fisica`,
      request
    );
  }

  makeOnlinePurchase(request: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(
      `${environment.apiUrl}${this.apiUri}/compra/web`,
      request
    );
  }

  makeATMWithdrawal(request: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(
      `${environment.apiUrl}${this.apiUri}/retiro/cajero`,
      request
    );
  }

  makeTransaction(transactionKey: string, request: TransactionRequest): Observable<TransactionResponse> {
    switch (transactionKey) {
      case 'B':
        return this.makeBranchDeposit(request);
      case 'A':
        return this.makeATMDeposit(request);
      case 'C':
        return this.makeDepositToAnotherAccount(request);
      case 'P':
        return this.makePhysicalPurchase(request);
      case 'O':
        return this.makeOnlinePurchase(request);
      case 'W':
        return this.makeATMWithdrawal(request);
      default:
        throw new Error('Invalid transaction key');
    }
  }
}
