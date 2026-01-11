import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: right;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background-color: #fff;
  height: 100vh;
  h1 {
    border-bottom: 2px solid #ff7a00;
    padding-inline: 5px;
    width: fit-content;
    margin-inline: auto;
    /* margin-bottom: 50px; */
    /* margin-top: -50px; */
  }
`;
export const ImgContainer = styled.div`
  width: 500px;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 50px;
  height: 400px;
  pointer-events: none;
  left: 0;
  top: 100px;
  p {
    padding: 15px 40px;
    background-color: #cac4c4a7;
    border-radius: 10px;
    margin-bottom: 20px;
    width: 200px;
    margin-inline: auto;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export const Wraper = styled.div`
  display: flex;
  margin-top: 30px;
  grid-gap: 35px;
  width: fit-content;
  margin-left: 120px;
`;
export const ScrollWindow = styled.div`
  position: fixed;
  inset: unset;
  left: 0;
  right: 0;
  bottom: 0;
  top: 80px;
  z-index: 9;
  overflow: auto;
  display: flex;
  justify-content: right;
  padding-bottom: 100px;
  margin-bottom: 50px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const DesWraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  scrollbar-gutter: stable;
  /* margin-top: 15%; */
  margin-right: 100px;
  h2,
  h3,
  h5,
  p,
  button,
  legend {
    font-style: normal;
    line-height: normal;
    font-family: Montserrat;
  }
  h2,
  h3,
  h5,
  p,
  button,
  legend {
    font-style: normal;
    line-height: normal;
  }
  h2 {
    margin: 20px 0;
    color: var(--text, #373737);
    font-size: 30px;
    font-weight: 600;
  }
  h3 {
    color: var(--blue, #006dab);
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  h5 {
    color: #373737;
    font-size: 17px;
    font-weight: 500;
  }
  p {
    color: rgba(55, 55, 55, 0.7);
    font-size: 15px;
    font-weight: 500;
  }
  button {
    border-radius: 10px;
    background: var(--blue, #006dab);
    cursor: pointer;

    /* btn sh */
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
    padding: 15px 30px;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    border: none;
    margin: 80px 0 20px 0;
  }
  legend {
    color: rgba(55, 55, 55, 0.8);
    font-family: "Open Sans";
    font-size: 16px;
    font-weight: 600;
    margin: 10px 0;
  }
  input {
    border-radius: 10px;
    background: rgba(55, 55, 55, 0.1);
    border: none;
    padding: 10px;
  }
`;
