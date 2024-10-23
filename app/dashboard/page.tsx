"use client";
import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ITransaction } from "@src/domain/entities/transaction";
import { TransactionApi } from "@src/infra/services/transactions";
import TransactionChart from "@src/presentation/components/Chart";
import SideBar from "@src/presentation/components/Sidebar";
import { TransactionCard } from "@src/presentation/components/TransactionCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as S from "./styles";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("deposit");

  const router = useRouter();

  useEffect(() => {
    const userAccount = JSON.parse(localStorage.getItem("userAccount") || "{}");
    if (!userAccount) {
      router.push("/");
    } else {
      loadData();
      setUserName(userAccount?.name || "Usuário");
    }
  }, [router]);

  const loadData = async () => {
    const transactionApi = new TransactionApi();
    const allTransactions = await transactionApi.fetchAllTransactions();
    setTransactions(allTransactions);
    setIsLoading(false);
  };

  const calculateTotals = (transactions: ITransaction[]) => {
    const totalIncome = transactions
      .filter((t) => t.transaction_type === "deposit")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);

    const totalExpenses = transactions
      .filter((t) => t.transaction_type === "withdraw")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
  

    const totalBalance = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, totalBalance };
  };

  const handleTransactionTypeChange = (type: string) => {
    setTransactionType(type);
  };

  const getLastFiveTransactions = (
    transactions: ITransaction[],
    type: string
  ) => {
    return transactions
      .filter((transaction) => transaction.transaction_type === type)
      .sort((a, b) => b.date - a.date) 
      .slice(0, 5); 
  };
  const formatCurrencyBRL = (amount: number) => {
    return amount.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const translateType = (type: string) => {
    switch (type) {
      case "withdraw":
        return "Despesas";
      case "deposit":
        return "Receitas";
      default:
        return type;
    }
  };
  const totals = calculateTotals(transactions);
  const lastFiveTransactions = getLastFiveTransactions(
    transactions,
    transactionType
  );

  return (
    <Container
      maxWidth={false}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "#f5f5f5",
      }}
    >
      <SideBar />

      {isLoading ? (
        <S.LoaderContainer>
          <CircularProgress color="secondary" />
          <S.LoaderText>Carregando informações...</S.LoaderText>
        </S.LoaderContainer>
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              bgcolor: "#1976d2",
              padding: 2,
              color: "white",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Bem-vindo, {userName}!
            </Typography>
            <Typography variant="subtitle1">
              Aqui está um resumo das suas transações.
            </Typography>
          </Box>

          <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
            Filtros
          </Typography>
          <Grid container spacing={3} sx={{ padding: 2 }}>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              onClick={() => handleTransactionTypeChange("deposit")}
              style={{ cursor: "pointer" }}
            >
              <TransactionCard
                title="Receitas"
                amount={totals.totalIncome.toString()}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              style={{ cursor: "pointer" }}
              onClick={() => handleTransactionTypeChange("withdraw")}
            >
              <TransactionCard
                title="Despesas"
                amount={totals.totalExpenses.toString()}
              />
            </Grid>


            <Grid item xs={12} sm={6} md={3}>
              <TransactionCard
                title="Saldo Total"
                amount={totals.totalBalance.toString()}
              />
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Últimas 5 transações ({translateType(transactionType)})
          </Typography>
          <List style={{ display: "flex", flexDirection: "row", width: "100vw", justifyContent:'space-around' }}>
            {lastFiveTransactions.map((transaction) => (
              <div key={transaction.date}>
                <ListItem style={{border: '1px solid #ccc', borderRadius: '8px'}}>
                  <ListItemText
                    primary={`Valor: ${formatCurrencyBRL(
                      parseFloat(transaction.amount)
                    )}`}
                    secondary={`Data: ${new Date(
                      transaction.date
                    ).toLocaleDateString()} - Tipo: ${translateType(
                      transaction.transaction_type
                    )}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
          <TransactionChart
            transactions={transactions}
            transactionType={transactionType}
          />
        </>
      )}
    </Container>
  );
}
