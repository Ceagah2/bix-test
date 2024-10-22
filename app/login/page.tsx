"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@src/presentation/components/Button";
import Carousel from "@src/presentation/components/Carousel";
import Input from "@src/presentation/components/Input";
import loginSchema from "@src/validation/loginSchema";
import Link from 'next/link';
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

  const handleLogin = (data: FormData) => {
    console.log("Logging in...", data);
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
          register={register("email")}
          error={errors.email?.message}
        />
        <Input
          type="password"
          placeholder="Senha"
          register={register("password")}
          error={errors.password?.message}
        />

        <Button type="submit" disabled={!register("email") || !register("password")}>
          Entrar
        </Button>

        <S.RegisterLink>
          Não tem conta? <Link href="/signup">Crie uma conta aqui </Link>
        </S.RegisterLink>
      </S.LoginForm>
    </S.LoginContainer>
  );
}
