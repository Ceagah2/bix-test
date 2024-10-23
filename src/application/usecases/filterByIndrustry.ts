import { ITransaction } from "@src/domain/entities/transaction";
import { TransactionApi } from "@src/infra/services/transactions";

export class FilterByIndustry {
  private transactionApi: TransactionApi;

  constructor(transactionApi: TransactionApi) {
    this.transactionApi = transactionApi;
  }

  async execute(industry: string): Promise<ITransaction[]> {
    const transactions = await this.transactionApi.fetchAllTransactions();
    return transactions.filter(
      (transaction) => transaction.industry === industry
    );
  }
}
