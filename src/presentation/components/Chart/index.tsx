import { Box, Typography } from "@mui/material";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import { ITransactionChartProps } from "./interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const TransactionChart: React.FC<ITransactionChartProps> = ({
  transactions,
  transactionType,
}) => {
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.transaction_type === transactionType
  );

  const labels = filteredTransactions.map((transaction) =>
    formatDate(transaction.date)
  );
  const dataValues = filteredTransactions.map((transaction) =>
    parseFloat(transaction.amount)
  );

  const data = {
    labels,
    datasets: [
      {
        label: `Transações do tipo: ${transactionType}`,
        data: dataValues,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Para permitir o ajuste do gráfico em proporção ao contêiner
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Gráfico de Transações (${transactionType})`,
      },
    },
  };

  const translateType = (type: string) => {
    switch (type) {
      case "withdraw":
        return "Despesas";
      case "deposit":
        return "Receitas";
      case "all":
        return "Todas";
      default:
        return type;
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "300px", sm: "400px", md: "80%" },
        height: { xs: "250px", sm: "300px", md: "600px" },
        marginBottom: { xs: "0", sm: "20", md: "20" },
      }}
    >
      <Typography variant="h5" textAlign="center" marginBottom={2}>
        Gráfico de Transações - {translateType(transactionType)}
      </Typography>
      <Bar data={data} options={options} height={undefined} width={undefined} />
    </Box>
  );
};

export default TransactionChart;
