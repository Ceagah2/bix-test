"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ITransaction } from "@src/domain/entities/transaction";
import { TransactionApi } from "@src/infra/services/transactions";
import TransactionChart from "@src/presentation/components/Chart";
import SideBar from "@src/presentation/components/Sidebar";
import { TransactionCard } from "@src/presentation/components/TransactionCard";
import dayjs from "dayjs";
import "dayjs/locale/br";
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as S from "./styles";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string>("deposit");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [allTransactions, setAllTransactions] = useState<ITransaction[]>([]);

 const [filters, setFilters] = useState({
   startDate: new Date(),
   endDate: new Date(),
   state: "",
   industry: "",
 });

  const router = useRouter();
  dayjs.extend(advancedFormat);

 const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;

   if (name === "startDate") {
     setStartDate(value ? new Date(value) : null);
   }

   if (name === "endDate") {
     setEndDate(value ? new Date(value) : null);
   }

   setFilters({ ...filters, [name as string]: value });
 };


  const loadData = async () => {
    const transactionApi = new TransactionApi();
    const fetchedTransactions = await transactionApi.fetchAllTransactions();
    setTransactions(fetchedTransactions);
    setAllTransactions(fetchedTransactions); 
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

  const handleDateFilter = (transactions: ITransaction[]) => {
    return transactions
    .filter((transaction) => {
      const transactionDate = dayjs(transaction.date);
      const isWithinDateRange =
        (!startDate ||
          transactionDate.isAfter(dayjs(filters.startDate))) &&
        (!endDate ||
          transactionDate.isBefore(dayjs(filters.endDate)));

      const isMatchingState =
        !filters.state || transaction.state.toLowerCase().includes(filters.state.toLowerCase());
      const isMatchingIndustry =
        !filters.industry || transaction.industry.toLowerCase().includes(filters.industry.toLowerCase());

      return isWithinDateRange && isMatchingState && isMatchingIndustry;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
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

  const applyFilters = () => {
    const filteredTransactions = handleDateFilter(allTransactions);
    setTransactions(filteredTransactions);
  };
  
  const clearFilters = () => {
    setFilters({
      startDate: new Date(),
      endDate: new Date(),
      industry: "",
      state: "",
    });
      setTransactions(allTransactions);
  };

  const totals = calculateTotals(transactions);
   const getLastFiveTransactions = (
     transactions: ITransaction[],
     type: string
   ) => {
     const filteredTransactions = handleDateFilter(
       transactions.filter(
         (transaction) => transaction.transaction_type === type
       )
     );

     return filteredTransactions.sort((a, b) => b.date - a.date).slice(0, 5);
   };
  const lastFiveTransactions = getLastFiveTransactions(
    transactions,
    transactionType
  );
  
 useEffect(() => {
   const userAccount = JSON.parse(localStorage.getItem("userAccount") || "{}");
   if (!userAccount) {
     router.push("/");
   } else {
     loadData();
     setUserName(userAccount?.name || "Usuário");
   }
 }, [router]);


  return (
    <Container
      maxWidth={false}
      style={{
        minHeight: "100vh",
        height: "100%",
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
        <Grid>
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

          <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
            Filtros
          </Typography>
          <Grid container spacing={3} sx={{ padding: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                name="startDate"
                label="Data Inicial"
                type="date"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                name="endDate"
                label="Data Final"
                type="date"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="text"
                placeholder="Indústria"
                value={filters.industry}
                onChange={(e) =>
                  setFilters({ ...filters, industry: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="text"
                placeholder="Estado"
                value={filters.state}
                onChange={(e) =>
                  setFilters({ ...filters, state: e.target.value })
                }
              />
            </Grid>
            <Grid container spacing={3} sx={{ padding: 2 }}>
              <Grid item xs={6} sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => applyFilters()}
                >
                  Aplicar Filtros
                </Button>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => clearFilters()}
                >
                  Limpar Filtros
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Últimas 5 transações ({translateType(transactionType)})
          </Typography>
          <List
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100vw",
              justifyContent: "space-around",
            }}
          >
            {lastFiveTransactions.map((transaction) => (
              <div key={transaction.date}>
                <ListItem
                  style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                >
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
            transactions={handleDateFilter(transactions)}
            transactionType={transactionType}
          />
        </Grid>
      )}
    </Container>
  );
}
