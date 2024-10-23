import { ITransaction } from "@src/domain/entities/transaction";
import { TransactionApi } from "@src/infra/services/transactions";

export class FilterByAccount {
  private transactionApi: TransactionApi;

  constructor(transactionApi: TransactionApi) {
    this.transactionApi = transactionApi;
  }

  async execute(account: string): Promise<ITransaction[]> {
    const transactions = await this.transactionApi.fetchAllTransactions();
    return transactions.filter(
      (transaction) => transaction.account === account
    );
  }
}
