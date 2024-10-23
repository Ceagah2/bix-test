import { ITransaction } from "@src/domain/entities/transaction";
import { Bar } from "react-chartjs-2";

export const TransactionChart = ({ transactions }:{ transactions: ITransaction[] }) => {
  const chartData = {
    labels: transactions.map(t => t.transaction_type), 
    datasets: [
      {
        label: "Valor das Transações por Tipo",
        data: transactions.map(t => parseFloat(t.amount)), 
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={chartData} />;
};
