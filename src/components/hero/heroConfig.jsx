import MotorImg from "assets/home.jpg";
import TuningImg from "assets/hero/tuning-hero.jpg";
import CaravanImg from "assets/hero/caravan-hero.jpeg";
import UsedCarsImg from "assets/hero/used-car-hero.jpg";
const heroConfig = {
  "/": {
    background: "url('/images/home-hero.jpg')",
    title: "Welcome Home",
    subtitle: "This is the homepage",
    color: "#fff",
  },
  "/vehicles/motor": {
    background: `url(${MotorImg})`,
    title: "Motors",
    subtitle: "This is the motor page",
    color: "#fff",
  },
  "/vehicles/caravan": {
    background: `url(${CaravanImg})`,
    title: "Caravan",
    subtitle: "Learn more about our story",
    color: "#000",
  },
  "/vehicles/tuning": {
    background: `url(${TuningImg})`,
    title: "Tuning",
    subtitle: "Explore what we offer",
    color: "#222",
  },
  "/vehicles/used-cars": {
    background: `url(${UsedCarsImg})`,
    title: "Used Cars",
    subtitle: "Explore what we offer",
    color: "#222",
  },
  "/camping": {
    background: "url('/images/products-hero.jpg')",
    title: "Camping Places",
    subtitle: "Explore what we offer",
    color: "#222",
  },
};

export default heroConfig;
