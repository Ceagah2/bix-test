export interface ITransaction {
  date: number; 
  amount: string;
  transaction_type: "deposit" | "withdraw" | "pending";
  currency: string;
  account: string;
  industry: string;
  state: string;
}
