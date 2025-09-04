import { useLocation } from "react-router-dom";
import { HeroSection, MotorH } from "../../style";
import heroConfig from "./heroConfig";

const Hero = () => {
  const location = useLocation();
  const { background, title, subtitle } = heroConfig[location.pathname];
  return (
    <HeroSection style={{ backgroundImage: background }}>
      <MotorH $home>{title}</MotorH>
      <MotorH $ranges>{subtitle}</MotorH>
      <MotorH $motor>Motors</MotorH>
    </HeroSection>
  );
};

export default Hero;
