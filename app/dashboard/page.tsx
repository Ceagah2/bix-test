"use client";
import { Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as S from './styles';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const userAccount = localStorage.getItem("userAccount");

    if (!userAccount) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <Container
      maxWidth={false} 
      style={{
        height: "100vh", 
        display: "flex", 
        alignItems: "center",
        justifyContent: "center", 
      }}
    >
      {isLoading ? (
        <S.LoaderContainer>
          <CircularProgress color="secondary" />
          <S.LoaderText>Carregando informações...</S.LoaderText>
        </S.LoaderContainer>
      ) : (
        <h1>Bem-vindo ao Dashboard!</h1>
      )}
    </Container>
  );
}
