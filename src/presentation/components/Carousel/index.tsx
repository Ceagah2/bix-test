import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { carouselImages } from "../../assets/imageUrls";
import * as S from "./styles";

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <S.CarouselContainer>
      <S.Image
        src={carouselImages[currentIndex].url}
        alt={`Imagem ${currentIndex + 1}`}
      />
      <S.Button onClick={prevImage} className="prev">
        <FaChevronLeft />
      </S.Button>
      <S.Button onClick={nextImage} className="next">
        <FaChevronRight />
      </S.Button>
      <S.TextContainer>
        <S.Title>{carouselImages[currentIndex].title}</S.Title>
        <S.Description>
          {carouselImages[currentIndex].description}
        </S.Description>
      </S.TextContainer>
    </S.CarouselContainer>
  );
};

export default Carousel;
