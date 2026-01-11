import styled from "styled-components";

export const TiltedDiv = styled.div`
  width: 200px;
  height: 50px;
  background-color: #006dab; /* Blue color */
  transform: skew(-20deg); /* Tilt the rectangle */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
`;

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-inline: auto;
  background-color: white;
  text-align: center;
  flex-shrink: 0;

  h2 {
    color: #000;
    font-family: Montserrat;
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-bottom: 30px;
  }
  h3 {
    color: var(--sariq, #ff7a00);
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 12px;
  }
  p {
    color: #000;
    font-family: Montserrat;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: left;
    margin-inline: 20px;
  }
`;
export const RecomendedImgDivs = styled.img`
  width: 290px;
  height: 167px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
export const BlogsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  max-width: 1300px;
  margin-inline: auto;
  margin-bottom: 30px;
  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
    max-width: 1000px;
  }
`;
