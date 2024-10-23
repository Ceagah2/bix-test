import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { ITransactionCardProps } from "./interface";

export const TransactionCard: React.FC<ITransactionCardProps> = ({
  title,
  amount,
}) => {
  const numericAmount = parseFloat(amount);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">
          {numericAmount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Typography>
      </CardContent>
    </Card>
  );
};
