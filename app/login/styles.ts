import styled from "styled-components";
import { colors } from "../../src/presentation/theme/colors";

export const LoginContainer = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 1110px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CarouselWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 50%; 
  }
`;

export const LoginForm = styled.form`
  width: 30%;
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  @media (max-width: 1110px) {
    width: 100%;
    padding: 1.5rem; 
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: ${colors.gray[900]};

  @media (max-width: 768px) {
    font-size: 1.5rem; 
  }
`;

export const Subtitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: ${colors.gray[600]};

  @media (max-width: 768px) {
    font-size: 0.9rem; 
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid ${colors.gray[300]};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    border-color: ${colors.primary};
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; 
  }
`;

export const ErrorMessage = styled.span`
  color: ${colors.error};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.buttonHover};
  }

  &:disabled {
    background-color: ${colors.gray[500]};
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; 
  }
`;

export const RegisterLink = styled.span`
  color: ${colors.primary};
  font-size: 0.875rem;
  margin-top: 1rem;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 0.8rem; 
  }
`;
