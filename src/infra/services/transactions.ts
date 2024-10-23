import transactionsData from "@src/data/transactions.json";
import { ITransaction } from "../../domain/entities/transaction";

export class TransactionApi {
  private data: ITransaction[] = [];

  constructor() {
    this.loadData(); 
  }

  async fetchAllTransactions(): Promise<ITransaction[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.data), 500); 
    });
  }

  private loadData() {
    this.data = transactionsData as ITransaction[];
  }
}
