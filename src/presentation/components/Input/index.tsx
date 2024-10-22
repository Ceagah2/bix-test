import { InputProps } from "./interface";
import * as S from "./styles";

const Input = ({
  type,
  placeholder,
  register,
  name,
  error,
}: InputProps) => {
  return (
    <S.InputWrapper>
      <S.InputStyled
        type={type}
        placeholder={placeholder}
        {...register(name)} 
        {...register} 
        name={name}
      />
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
    </S.InputWrapper>
  );
};

export default Input;
