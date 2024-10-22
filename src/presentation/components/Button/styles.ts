import { colors } from "@src/presentation/theme/colors";
import styled from "styled-components";

export const ButtonStyled = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.buttonHover};
  }

  &:disabled {
    background-color: ${colors.gray[600]};
    cursor: not-allowed;
  }
`;
