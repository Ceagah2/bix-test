import { IContainer } from './interface';
import * as S from './styles';
export const Container = ({ children }: IContainer) => {
  return <S.Container>{children}</S.Container>;
};
