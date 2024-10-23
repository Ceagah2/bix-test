import { ITransaction } from "../entities/transaction";

export class TransactionFilterService {
  filterByTransactionType(
    transactions: ITransaction[],
    type: "deposit" | "withdraw"
  ): ITransaction[] {
    return transactions.filter(
      (transaction) => transaction.transaction_type === type
    );
  }

  filterByCurrency(
    transactions: ITransaction[],
    currency: string
  ): ITransaction[] {
    return transactions.filter(
      (transaction) => transaction.currency === currency
    );
  }

  filterByAccount(
    transactions: ITransaction[],
    account: string
  ): ITransaction[] {
    return transactions.filter(
      (transaction) => transaction.account === account
    );
  }

  filterByIndustry(
    transactions: ITransaction[],
    industry: string
  ): ITransaction[] {
    return transactions.filter(
      (transaction) => transaction.industry === industry
    );
  }

  filterByState(transactions: ITransaction[], state: string): ITransaction[] {
    return transactions.filter((transaction) => transaction.state === state);
  }

  filterByDateRange(
    transactions: ITransaction[],
    startDate: number,
    endDate: number
  ): ITransaction[] {
    return transactions.filter(
      (transaction) =>
        transaction.date >= startDate && transaction.date <= endDate
    );
  }
}
