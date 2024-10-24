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
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [allTransactions, setAllTransactions] = useState<ITransaction[]>([]);
  const [filters, setFilters] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    state: "",
    industry: "",
  });

  const router = useRouter();
  dayjs.extend(advancedFormat);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "startDate") {
      setStartDate(value ? new Date(value).toISOString().split("T")[0] : '');
    }

    if (name === "endDate") {
      setEndDate(value ? new Date(value).toISOString().split("T")[0] : '');
    }

    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
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

  const clearFilters = () => {
    setFilters({
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
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

    return filteredTransactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
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
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        backgroundColor: "#f5f5f5",
        padding: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <SideBar />

      {isLoading ? (
        <S.LoaderContainer>
          <CircularProgress color="secondary" />
          <S.LoaderText>Carregando informações...</S.LoaderText>
        </S.LoaderContainer>
      ) : (
        <Grid container sx={{ width: "100%" }}>
          <Box
            sx={{
              width: { xs: "90vw", md: "95vw" },
              bgcolor: "#1976d2",
              padding: 2,
              color: "white",
              marginTop: "8px",
              borderRadius: "8px",
              marginLeft: '40px'
            }}
          >
            <Typography variant="h4" gutterBottom>
              Bem-vindo, {userName}!
            </Typography>
            <Typography variant="subtitle1">
              Aqui está um resumo das suas transações.
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ paddingTop: 2 }}>
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              onClick={() => handleTransactionTypeChange("deposit")}
              sx={{ cursor: "pointer" }}
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
              onClick={() => handleTransactionTypeChange("withdraw")}
              sx={{ cursor: "pointer" }}
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

          <Typography variant="h5" sx={{ marginTop: "20px" }}>
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
                name="industry"
                placeholder="Indústria"
                value={filters.industry}
                onChange={handleFilterChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                name="state"
                placeholder="Estado"
                value={filters.state}
                onChange={handleFilterChange}
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <Button
                variant="outlined"
                fullWidth
                color="secondary"
                onClick={clearFilters}
                style={{ height: "55px" }}
              >
                Limpar filtros
              </Button>
            </Grid>
          </Grid>

          <TransactionChart
            transactions={handleDateFilter(transactions)}
            transactionType={transactionType}
          />

          <Divider sx={{ my: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              width: { xs: "100%", sm: "60%", md: "40%", lg: "20%" }, 
              padding: { xs: 1, sm: 2 }, 
              marginBottom: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginBottom: 1,
                textAlign: "center", 
              }}
            >
              Últimas 5 transações
            </Typography>

            <List
              sx={{
                paddingLeft: 0,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              {lastFiveTransactions.map((transaction, index) => (
                <ListItem
                  key={index}
                  sx={{
                    width: "100%",
                    justifyContent: "space-between",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    paddingLeft: "8px",
                    paddingRight: "8px", 
                    flexDirection: { xs: "column", sm: "row" }, 
                    alignItems: { xs: "flex-start", sm: "center" }, 
                  }}
                >
                  <ListItemText
                    primary={dayjs(transaction.date).format("DD/MM/YYYY")}
                    secondary={transaction.industry}
                    sx={{
                      paddingLeft: 0,
                      width: { xs: "100%", sm: "75%" }, 
                      marginBottom: { xs: "8px", sm: 0 },
                      textAlign: { xs: "left", sm: "left" },
                    }}
                  />
                  <ListItemText
                    primary={formatCurrencyBRL(Number(transaction.amount))}
                    secondary={translateType(transaction.transaction_type)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: { xs: "flex-start", sm: "flex-end" }, 
                      width: { xs: "100%", sm: "auto" },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      )}
    </Container>
  );
}
