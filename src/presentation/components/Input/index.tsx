import { FieldValues } from "react-hook-form";
import { InputProps } from "./interface";
import * as S from "./styles";

const Input = <T extends FieldValues,>({
  type,
  placeholder,
  register,
  name,
  error,
}: InputProps<T>) => {
  return (
    <S.InputWrapper>
      <S.InputStyled
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.InputWrapper>
  );
};

export default Input;
