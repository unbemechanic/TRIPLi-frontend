import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 999999999999;
`;

export const ModalContent = styled.div`
  background: #fff;
  margin: auto;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;

  button {
    position: absolute;
    width: 30px;
    height: 30px;
    font-size: 20px;
    top: 10px;
    right: 10px;
    margin: 0;
    background-color: #da2100;
    border: none;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
  form {
    display: flex;
    flex-direction: column;

    label {
      color: black;
      font-weight: 500;
      font-size: 15px;
    }

    button {
      background-color: #006dab;
      position: relative;
      width: 100%;
      height: 40px;
      inset: unset;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr; /* 2 columns */
      gap: 10px 2rem; /* row gap and column gap */
    }

    .form-grid label:nth-of-type(1) {
      grid-column: 1;
      grid-row: 1;
    }

    .form-grid input:nth-of-type(1) {
      grid-column: 1;
      grid-row: 2;
    }

    .form-grid label:nth-of-type(2) {
      grid-column: 2;
      grid-row: 1;
    }

    .form-grid input:nth-of-type(2) {
      grid-column: 2;
      grid-row: 2;
    }
  }
  input,
  select {
    margin-bottom: 15px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding-inline: 10px;
    &:focus {
      outline: 2px solid #006cabae;
    }
  }
`;
