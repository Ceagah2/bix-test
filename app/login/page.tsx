"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
import Button from "@src/presentation/components/Button";
import Carousel from "@src/presentation/components/Carousel";
import Input from "@src/presentation/components/Input";
import loginSchema from "@src/validation/loginSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData } from "./interface";
import * as S from "./styles";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter();
  const handleLogin = (data: FormData) => {
    setIsLoading(true);
    const storedUser = localStorage.getItem("userAccount");
    if (!storedUser) {
      alert("Você não tem uma conta. Por favor, crie uma conta primeiro, clicando em Crie uma conta aqui.");
      return;
    }
    const userAccount = JSON.parse(storedUser);
    if (
      data.email === userAccount.email &&
      data.password === userAccount.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard")
      setIsLoading(false);
    } else {
      alert("Email ou senha incorretos. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <S.LoginContainer>
      <S.CarouselWrapper>
        <Carousel />
      </S.CarouselWrapper>
      <S.LoginForm onSubmit={handleSubmit(handleLogin)}>
        <S.Title>Bem-vindo ao Dashboard Financeiro</S.Title>
        <S.Subtitle>
          Entre para gerenciar suas transações com facilidade
        </S.Subtitle>

        <Input
          type="email"
          placeholder="Email"
          register={() => register("email")}
          name="email"
          error={errors.email?.message}
        />

        <Input
          type="password"
          placeholder="Senha"
          register={() => register("password")}
          name="password"
          error={errors.password?.message}
        />

        <Button type="submit">{isLoading ? <CircularProgress color="secondary" /> : "Entrar"}</Button>

        <S.RegisterLink>
          Não tem conta? <Link href="/signup">Crie uma conta aqui</Link>
        </S.RegisterLink>
      </S.LoginForm>
    </S.LoginContainer>
  );
}
