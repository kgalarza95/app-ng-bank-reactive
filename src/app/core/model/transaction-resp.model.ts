export interface TransactionResponse {
    id: string;
    description: string;
    amount: number;
    tax: number;
    transactionType: string;
    accountId: string;
    date: string;
}