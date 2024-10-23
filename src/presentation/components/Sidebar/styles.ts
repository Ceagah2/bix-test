import { colors } from "@src/presentation/theme";
import styled from "styled-components";

export const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1300;
`;

export const LoaderText = styled.span`
  margin-top: 16px;
  font-size: 1.2rem;
  color: ${colors.gray[900]};
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${colors.white};
`;

export const UserName = styled.h2`
  margin-top: 10px;
  font-size: 1.2rem;
  color: ${colors.gray[900]};
  font-weight: 600;
`;
