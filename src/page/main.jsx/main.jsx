import MultiCarouselComponent from "./component/multiCarousel";
import { MainPageContainer } from "./styles";

import Hero from "./component/hero";
import { useCart } from "../../contextAPI/Context";
import { useEffect } from "react";
import VideoGallery from "./component/VideoGallery";
import BlogsWindow from "./component/blogsWindow";

const MainComponent = () => {
  const { refreshCart } = useCart();
  useEffect(() => {
    refreshCart();
  }, []);
  return (
    <MainPageContainer>
      <Hero />
      <MultiCarouselComponent />
      <VideoGallery />
      <BlogsWindow />
    </MainPageContainer>
  );
};

export default MainComponent;
