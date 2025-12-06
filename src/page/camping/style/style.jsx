import { Link } from "react-router-dom";
import styled from "styled-components";

export const CampingBoxLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  color: black;
  height: 300px;
  width: 300px;
  box-shadow: 0 0 5px 0px lightgray;
  /* align-items: center; */
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  &:hover {
    transform: scale(1.02);
  }
  img {
    width: 100%;
    height: 70%;
  }
`;
