import styled from "styled-components";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WindowSharpIcon from "@mui/icons-material/WindowSharp";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";

export const HorizontalFilter = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(55, 55, 55, 0.403);
  padding-bottom: 15px;
  /* background-color: yellow; */
  position: relative;
  width: 1050px;
  div {
    display: flex;
    align-items: center;
    gap: 10px;

    input {
      padding: 10px;
      border: none;
      background-color: inherit;
      width: 100%;
      /* border-right: 1px solid black; */
    }
  }
  @media (max-width: 1100px) {
    width: 100%;
  }
  @media (max-width: 1100px) {
    display: grid;
    /* width: 700px; */
    grid-template-columns: 30% 70%;
    align-items: flex-start;
    margin-inline: auto;
  }
  @media (max-width: 800px) {
    width: 100%;
    align-items: flex-start;
  }
  @media (max-width: 480px) {
    display: grid;
    align-items: flex-start;
    margin-inline: 0;
  }
`;
export const VerticalFilterInput = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  margin-right: ${(props) => (props.$inputs ? "20px" : "")};
  @media (max-width: 1100px) {
    margin-right: 0px;
  }
`;
export const Star = styled(StarIcon)`
  color: rgb(255, 122, 0);
`;
export const SLink = styled(Link)`
  text-decoration: none;
  display: grid;
  grid-template-rows: 1fr 1fr;
  color: black;
  /* padding: 20px; */
  height: 300px;
  width: 240px;
  box-shadow: 0 0 5px 0px lightgray;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;

  @media (max-width: 560px) {
    width: 100%;
  }
  @media (max-width: 440px) {
    width: 100%;
  }
  &:hover {
    transform: scale(1.02);
  }
  img {
    width: 100%;
    height: 170px;
  }
  h3 {
    color: var(--text, #373737);
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  h1 {
    color: var(--blue, #006dab);
    font-family: Montserrat;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  p {
    font-size: 12px;
    font-weight: 400;
    font-family: Montserrat;
    color: #373737;
    display: flex;
    align-items: center;
  }
`;
export const Buttons = styled.button`
  border: 1px solid #006dab;
  border-radius: 5px;
  color: #006dab;
  font-weight: 600;
  padding: 10px 15px;
  background-color: inherit;
  flex: 1;
  white-space: nowrap;
  &:hover {
    background-color: #006dab;
    color: white;
    cursor: pointer;
    &:first-child {
      background-color: #fff;
      color: #006dab;
    }
  }
  &:focus {
    background-color: #006cab68;
  }
  &:first-child {
    background-color: #006dab;
    color: #fff;
  }
`;
export const Rating = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const FunctionButtons = styled.div`
  display: grid;
  row-gap: 5px;
  padding: 20px;
  .title {
    display: flex;
    justify-content: space-between;
    :nth-child(2) {
      color: #373737;
    }
  }
  .row {
    display: flex;
    gap: 10px;
  }
`;
export const Container = styled.div`
  position: relative;
  display: grid;
  margin-inline: auto;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  background-position: center;
  grid-gap: 30px;
  flex-shrink: 0;
  padding: 30px 0;
  transition: 0ms.9s;

  input {
    position: absolute;
    background-color: inherit;
    top: -52px;
    left: 100px;
    width: 600px;
    border: 1px solid black;
    padding: 10px 10px;
    border-radius: 5px;
  }

  div {
    &:hover {
      /* transition: 0ms.9s; */
    }
  }
  @media (max-width: 1100px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-around;
    align-items: center;
  }
  @media (max-width: 850px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    margin-inline: 50px;
  }
  @media (max-width: 560px) {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-around;
    align-items: center;
    /* width: 70%; */
    margin-inline: auto;
  }
  @media (max-width: 440px) {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-around;
    align-items: center;
    /* width: 70%; */
  }
`;
export const CarImg = styled.div``;
export const ExpandButton = styled.button`
  grid-column: 1 / -1;
  padding: 15px 30px;
  background-color: #006dab;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  margin: 20px auto;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005a8c;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
export const ExpandStyle = styled(ExpandMoreIcon)`
  font-size: 1.5rem;
  padding-inline: 5px;
  cursor: pointer;
  border-left: 1px solid black;
  padding: 5px;
`;

export const ListIconStyle = styled(ViewListRoundedIcon)`
  padding: 5px 0;

  padding-inline: 5px 2px;
  padding-left: 5px;
  padding-right: 7px;
  margin-left: -10px;
  color: rgba(55, 55, 55, 0.4);
  &:hover {
    cursor: pointer;
  }
`;
export const WindowStyle = styled(WindowSharpIcon)`
  font-size: 1.5rem;
  padding-inline: 0px;
  border-right: 1px solid gray;
  &:hover {
    cursor: pointer;
  }
  padding: 5px;
`;
export const FilterSec = styled.div`
  display: flex;
  white-space: nowrap;
  @media (max-width: 950px) {
    flex-wrap: wrap-reverse;
    justify-content: flex-end;
  }
`;
export const InputSearch = styled.input`
  min-width: 600px;
  @media (max-width: 1100px) {
    min-width: 300px;
  }
  @media (max-width: 850px) {
    min-width: 200px;
  }
`;
