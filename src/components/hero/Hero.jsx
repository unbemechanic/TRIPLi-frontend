import { useLocation } from "react-router-dom";
import { HeroSection, MotorH } from "../../style";
import heroConfig from "./heroConfig";
import CampingHomeImg from "assets/camping-places-12.jpg";
import CaravanHome from "assets/caravan-header-3.webp";
import TuningHomeImg from "assets/tuning-header-7.jpg";
import UsedCarHomeImg from "assets/used-header.jpg";
import HomeImg from "assets/home.jpg";

const getHeroBackground = (props) => {
  if (props.$camping) return CampingHomeImg;
  if (props.$caravan) return CaravanHome;
  if (props.$tuning) return TuningHomeImg;
  if (props.$usedCar) return UsedCarHomeImg;
  return HomeImg;
};

const Hero = () => {
  const location = useLocation();
  const { background, title, subtitle } = heroConfig[location.pathname];
  return (
    <HeroSection
      background={getHeroBackground}
      style={{ backgroundImage: background }}
    >
      <MotorH $home>{title}</MotorH>
      <MotorH $ranges>{subtitle}</MotorH>
      <MotorH $motor>{title}</MotorH>
    </HeroSection>
  );
};

export default Hero;
