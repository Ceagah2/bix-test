import React from "react";
import { InputProps } from "./interface";
import * as S from "./styles";


const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  register,
  error,
}) => {
  return (
    <S.InputWrapper>
      <S.InputStyled type={type} placeholder={placeholder} {...register} />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.InputWrapper>
  );
};

export default Input;
