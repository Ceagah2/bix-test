import { colors } from '@src/presentation/theme/colors';
import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;
`;

export const InputStyled = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }
`;

export const ErrorMessage = styled.span`
  color: ${colors.error};
  font-size: 12px;
  margin-top: 5px;
`;
