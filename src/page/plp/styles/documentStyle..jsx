import styled from "styled-components";
import HomeImg from "../../../assets/motorHome.png";
import InnerSofa from "../../../assets/carInSofa.png";
import InnerSofa2 from "../../../assets/carInSofa2.png";
import InnerSofa3 from "../../../assets/carInSofa3.png";
import InnerSofa4 from "../../../assets/carInSofa4.png";
import InnerSofa5 from "../../../assets/carInSofa5.png";
import SeatIcon from "../../../assets/pdp/car-seat-svgrepo-com.svg";
import TransmissionIcon from "../../../assets/pdp/transmission-svgrepo-com.svg";
import LicensePlateIcon from "../../../assets/pdp/license-plate-number-svgrepo-com.svg";
import CategoryIcon from "../../../assets/pdp/category-svgrepo-com.svg";

export const Home = styled.div`
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.6) 100%
    ),
    url(${HomeImg}) lightgray 50% / cover no-repeat;
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 180%;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  flex-shrink: 100;
`;
export const HomeButton = styled.div`
  display: flex;
  margin-top: 50px;
  color: #fff;
  button {
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    height: 50px;
    width: 181px;
    margin: 20px;
    display: flex;
    flex-shrink: 1;
  }
`;
export const CarSpec = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 50px;
  align-items: center;
  align-content: center;
  justify-content: center;
  margin-inline: auto;

  @media (min-width: 1800px) {
    max-width: 70%;
  }

  h2 {
    color: var(--text, #373737);
    font-family: Montserrat;
    font-size: 35px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 20px;
    padding: 20px;
  }
  p {
    color: #373737;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    padding: 20px;
  }
  img {
    background-color: inherit;
    border: none;
    box-shadow: none;
    width: 50vw;
  }
  button {
    margin: 20px;
  }
  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
    width: 50%;
  }
`;

// export const CarDesName = styled.div`
//   display: flex;
//   padding: 20px;
//   align-items: center;
//   justify-content: space-between;
//   border-bottom: 1px solid rgba(159, 152, 152, 0.667);
// `;
export const CarSpecTitle = styled.div`
  color: #16628d;
  font-family: Montserrat;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
export const CarSpecDesc = styled.div`
  color: var(--text, #373737);
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  width: 75%;
`;

export const BackgroundImg = styled.div`
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    url(${InnerSofa}) lightgray 50% / cover no-repeat;
  height: 50vh;
  background-image: ${(props) => (props.$second ? `url(${InnerSofa2})` : "")};
  background-image: ${(props) => (props.$third ? `url(${InnerSofa3})` : "")};
  background-image: ${(props) => (props.$fourth ? `url(${InnerSofa4})` : "")};
  background-image: ${(props) => (props.$fifth ? `url(${InnerSofa5})` : "")};

  @media (max-width: 1300px) {
    margin-bottom: 30px;
  }
`;
export const TabImages = styled.img`
  background-size: cover;
  background-position: center;
  background-color: none;
  border: none;
  border-radius: none;
`;
export const TabContent = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid gray;
  margin: 20px 50px;
  padding-bottom: 20px;
  border-bottom: ${(props) => (props.$review ? "none" : "")};

  p,
  h2,
  h4 {
    box-sizing: border-box;
    padding-inline: 20px;
    max-width: 600px;
  }
  h4 {
    margin-bottom: 10px;
    color: rgba(55, 55, 55, 0.8);
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  :first-child {
    color: var(--text, #373737);
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  :last-child {
    margin-left: auto;
  }
`;
export const MainContainer = styled.div`
  margin: auto;
  /* max-width: 1400px; */
`;
export const Length = styled.div`
  color: #006dab;
  color: var(--blue, #006dab);
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-inline: 10px;
`;
export const QustionContainer = styled.div`
  border-bottom: 1px solid gray;
  height: 50px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 10px;
  padding-bottom: 10px;
  :first-child {
    font-size: 16px;
    font-family: Montserrat;
  }
  :last-child {
    color: #373737;
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: ${(props) => (props.$name ? "500" : "600")};
    line-height: normal;
  }
`;
export const QWrapper = styled.div`
  display: flex;
  margin-inline: auto;
  justify-content: center;
  gap: 150px;
  @media (max-width: 1300px) {
    /* grid-template-columns: 1fr;
        align-items: center; */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  div {
    flex-shrink: 1;
  }
`;
export const Qustion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: 30%;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  color: var(--text-color, #023047);
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 31.2px */
  max-width: 500px;
  button {
    width: 100%;
    background-color: #006dab;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px;
    &:hover {
      cursor: pointer;
    }
    &:active {
      opacity: 0.7;
    }
  }
`;
export const InputA = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;
  width: 100%;
  :last-child {
    height: 100px;
  }
  input {
    width: 100%;
    height: 50px;
    border: none;
    background: var(--text, #dae0e254);
    border-radius: 10px;
    color: black;
    padding-left: 15px;
    box-sizing: border-box;
  }
`;
export const ContactImg = styled.div`
  // delete
  background-size: contain;
  background-position: right;
  background-repeat: no-repeat;
  width: 500px;
  height: 280px;
`;
export const ContactWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  @media (max-width: 1300px) {
    flex-direction: column;
  }
`;
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  div {
    background-color: white;
    margin-top: px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  }
`;
export const ProductInfoWrapper = styled.div`
  /* padding: 20px 0px; */
  span {
    font-size: 50px;
  }
  .rating-stars-default {
    color: #f5a623; /* Gold color for filled stars */
  }
`;
export const Specification = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 20px;
  border-block: ${(props) =>
    props.$specific ? "1px solid rgba(201, 201, 201, 0.625)" : "none"};
  p {
    display: flex;
    font-weight: 700;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
  }
  .cost-per-day {
    border-right: 1px solid rgba(201, 201, 201, 0.625);
  }
`;
export const SpecificationIcon = styled.div`
  width: 44px;
  height: 44px;
  background-image: ${(props) =>
    `url(${
      props.$seat
        ? SeatIcon
        : props.$license
        ? LicensePlateIcon
        : props.$transmission
        ? TransmissionIcon
        : props.$category
        ? CategoryIcon
        : ""
    })`};
  background-position: center;
  background-size: 26px;
  background-repeat: no-repeat;
  border: 1px solid #e9e9e9;
  border-radius: 50%;
`;
export const BookingButton = styled.button`
  background-color: #006dab;
  color: white;
  line-height: 56px;
  padding: 0 45px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 22px;
  font-family: Montserrat;

  &:hover {
    background-color: #005a8c;
  }
`;
export const PDPImage = styled.img`
  max-width: 700px;
  max-height: 700px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #f0f0f0;
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
  gap: 8px;
`;

export const PageButton = styled.button`
  padding: 8px 14px;
  border: 1px solid #ddd;
  background: ${({ $active }) => ($active ? "#000" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  cursor: pointer;

  &:hover {
    background: #000;
    color: #fff;
  }
`;
