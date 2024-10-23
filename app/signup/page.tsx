"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@src/presentation/components/Button";
import Carousel from "@src/presentation/components/Carousel";
import Input from "@src/presentation/components/Input";
import { registerSchema } from "@src/validation/signinSchema";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RegisterFormInputs } from "./interface";
import * as S from "./styles";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    router.push("/");
    alert("Conta criada com sucesso!");
    localStorage.setItem("userAccount", JSON.stringify(data));
  };

  return (
    <S.RegisterContainer>
      <S.CarouselWrapper>
        <Carousel />
      </S.CarouselWrapper>
      <S.RegisterForm onSubmit={handleSubmit(onSubmit)}>
        <S.Header>
          <S.Title>Crie uma nova conta</S.Title>
          <S.SubTitle>
            Para poder acessar o último painel de controle que você irá
            precisar.
          </S.SubTitle>
        </S.Header>

        <Input
          type="text"
          placeholder="Nome"
          register={() => register("name")}
          name={"name"}
          error={errors.name?.message}
        />

        <Input
          type="email"
          placeholder="Email"
          register={() => register("email")}
          name={"email"}
          error={errors.email?.message}
        />

        <S.PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            register={() => register("password")}
            name={"password"}
            error={errors.password?.message}
          />
          <S.Icon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </S.Icon>
        </S.PasswordWrapper>

        <S.PasswordWrapper>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirme a Senha"
            register={() => register("confirmPassword")}
            name={"confirmPassword"}
            error={errors.confirmPassword?.message}
          />
          <S.Icon onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </S.Icon>
        </S.PasswordWrapper>

        <Button type="submit">Criar conta</Button>
        <Button onClick={() => router.push("/")}>Voltar</Button>
      </S.RegisterForm>
    </S.RegisterContainer>
  );
}
