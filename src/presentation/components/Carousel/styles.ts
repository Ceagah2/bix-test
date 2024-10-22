import styled from "styled-components";
import { colors } from "../../theme/colors";

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* Define uma altura fixa para o carrossel */
  overflow: hidden;

  @media (max-width: 1110px) {
    height: 50vh; /* Ajusta a altura em telas menores */
  }

  @media (max-width: 768px) {
    height: 40vh; /* Ajusta a altura ainda mais em telas pequenas */
  }
  @media (max-width: 680px) {
    display: none;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%; /* Garante que a imagem preencha toda a área do carrossel */
  object-fit: cover; /* Mantém a proporção da imagem sem distorcer */
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

    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
`;

export const TextContainer = styled.div`
  width: 80%; /* Largura adaptativa */
  max-width: 500px; /* Largura máxima para telas grandes */
  height: auto; /* Altura automática para adaptar ao conteúdo */
  padding: 10px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: ${colors.white};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 16px;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

export const Title = styled.h2`
  font-size: 1.5em;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

export const Description = styled.p`
  font-size: 1em;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;
