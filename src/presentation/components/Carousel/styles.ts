import styled from "styled-components";
import { colors } from "../../theme/colors";

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const TextContainer = styled.div`
  width: 500px;
  height: 75px;
  padding: 10px;
  position: absolute;
  bottom: 20px; 
  left: 40%;
  text-align: center;
  color: ${colors.white}; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
`;

export const Title = styled.h2`
  font-size: 1.5em; 
  margin: 0;
`;

export const Description = styled.p`
  font-size: 1em; 
  margin: 0;
`;
