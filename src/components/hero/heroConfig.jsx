import MotorImg from "../../assets/home.jpg";
const heroConfig = {
  "/": {
    background: "url('/images/home-hero.jpg')",
    title: "Welcome Home",
    subtitle: "This is the homepage",
    color: "#fff",
  },
  "/motor": {
    background: `url(${MotorImg})`,
    title: "Home/Motors",
    subtitle: "This is the motor page",
    color: "#fff",
  },
  "/caravan": {
    background: "url('/images/about-hero.jpg')",
    title: "About Us",
    subtitle: "Learn more about our story",
    color: "#000",
  },
  "/tuning": {
    background: "url('/images/products-hero.jpg')",
    title: "Our Products",
    subtitle: "Explore what we offer",
    color: "#222",
  },
  "/usedCar": {
    background: "url('/images/products-hero.jpg')",
    title: "Our Products",
    subtitle: "Explore what we offer",
    color: "#222",
  },
  "/camping": {
    background: "url('/images/products-hero.jpg')",
    title: "Our Products",
    subtitle: "Explore what we offer",
    color: "#222",
  },
};

export default heroConfig;
