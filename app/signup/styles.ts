import { colors } from "@src/presentation/theme/colors";
import { fonts } from "@src/presentation/theme/fonts";
import { sizes } from "@src/presentation/theme/sizes";
import styled from "styled-components";

export const RegisterContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const CarouselWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RegisterForm = styled.form`
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
  gap: 8px;
`;

export const Header = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`
export const Title = styled.h2`
  text-align: center;
  font-family: ${fonts.title};
  color: ${colors.gray[900]};
  font-size: ${sizes.subheading};
`;

export const SubTitle = styled.span`
  color: ${colors.gray[900]};
  font-family: ${fonts.body};
  font-size: ${sizes.text};
  text-align: center;
`;

export const RegisterButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.buttonHover};
  }
`;

export const ErrorMessage = styled.span`
  color: ${colors.error};
  font-size: 14px;
  margin-top: -10px;
`;


export const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${colors.gray[300]};
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  align-items: center;
  display: flex;
`;

export const Icon = styled.span`
  position: absolute;
  top: 40%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;
