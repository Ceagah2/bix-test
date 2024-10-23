import { ITransaction } from "@src/domain/entities/transaction";
import { TransactionApi } from "@src/infra/services/transactions";

export class FilterByDateRange {
  private transactionApi: TransactionApi;

  constructor(transactionApi: TransactionApi) {
    this.transactionApi = transactionApi;
  }

  async execute(startDate: number, endDate: number): Promise<ITransaction[]> {
    const transactions = await this.transactionApi.fetchAllTransactions();
    return transactions.filter(
      (transaction) =>
        transaction.date >= startDate && transaction.date <= endDate
    );
  }
}
