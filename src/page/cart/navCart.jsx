import { useEffect, useState } from "react";
import { Container } from "./cart";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API } from "../../address/address";
import { formatKRW } from "../../utils/currency";
import { useCart } from "../../contextAPI/cartContext";

const NavCart = () => {
  const { carts, handleUpdateQuantity, handleMinusQuantity, refreshCart } =
    useCart();

  return (
    <div style={{ marginBottom: "50px", minHeight: "50dvh" }}>
      <Container $cart>
        <h1>Cart</h1>
        <h3>Cart items: {carts.items?.length}</h3>
        {carts.items?.map((item) => (
          <Link
            key={item._id}
            to={`/cart/${item.productId}`}
            style={{ width: "100%", textDecoration: "none" }}
          >
            <CellWrapper key={item.productId}>
              <img src={item.productId?.image} alt="car image" />
              <InfoSec>
                <h3>
                  {item.productId?.name}{" "}
                  <h4>{formatKRW(item.productId?.cost)}</h4>
                </h3>
                <div>
                  <p>{item.productId?.company} </p>
                  <div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpdateQuantity(
                          item.productId?._id,
                          item.quantity + 1
                        );
                      }}
                    >
                      +
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleMinusQuantity(item.productId?._id, item.quantity);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
                <b>
                  Location: <span>{item.productId?.location}</span>
                </b>
                <b>
                  Payment method: <span>Credit card</span>
                </b>
              </InfoSec>
            </CellWrapper>
          </Link>
        ))}
      </Container>
    </div>
  );
};

export default NavCart;

const CellWrapper = styled.div`
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  width: 100%;
  height: 180px;
  gap: 30px;
  padding: 30px;
  box-sizing: border-box;
  @media (max-width: 550px) {
    flex-direction: column;
    height: fit-content;
  }
`;
const InfoSec = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 4;
  font-family: Montserrat;

  h3 {
    display: flex;
    justify-content: space-between;
  }
  h4 {
    color: #006dab;
  }
  div {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
  }
  span {
    color: rgba(55, 55, 55, 0.7);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  button {
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    &:hover {
      background-color: #006dab; /* Darker shade on hover */
      transform: scale(1.1);
      color: white;
    }
  }
`;
