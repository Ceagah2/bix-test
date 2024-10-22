import React from "react";
import { ButtonProps } from "./interface";
import * as S from "./styles";

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  disabled,
}) => {
  return (
    <S.ButtonStyled type={type} onClick={onClick} disabled={disabled}>
      {children}
    </S.ButtonStyled>
  );
};

export default Button;
