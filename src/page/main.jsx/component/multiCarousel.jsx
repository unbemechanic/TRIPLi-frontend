import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { RecomendedImgDivs, TiltedDiv } from "../styles";
import "../styles.css";
import { useFetchData } from "components/custom hooks/useFetch";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 4,
    slidesToSlide: 3, // optional, default to 1.,
  },
  tablet: {
    breakpoint: { max: 1300, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const DEV_URL = `http://localhost:5500/products/recommended/list`;

const RecommendedCard = ({ image, name }) => {
  return (
    <div className="recommended-card">
      <RecomendedImgDivs src={image} alt={name} />
      <h4>{name}</h4>
      <TiltedDiv>Discover the range</TiltedDiv>
      <div className="model">
        Choose a model
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 -960 960 960"
          width="20"
          fill="gray"
        >
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
      </div>
    </div>
  );
};

const MultiCarouselComponent = () => {
  const { data: recommended, loading, error } = useFetchData(DEV_URL, []);

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p>Failed to load recommendations</p>;

  return (
    <div className="multi-carousel-container">
      <h1>Recommended</h1>

      <Carousel
        swipeable
        draggable
        showDots
        responsive={responsive}
        ssr
        infinite
        keyBoardControl
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {recommended.map((item) => (
          <RecommendedCard
            key={item.id}
            name={item.car?.name}
            image={item.image || "/assets/fallback.png"}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default MultiCarouselComponent;
