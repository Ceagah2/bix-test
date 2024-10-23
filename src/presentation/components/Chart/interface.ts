export interface ITransactionChartProps {
  transactions: {
    date: number;
    amount: string;
    transaction_type: string;
  }[];
  transactionType: string;
}