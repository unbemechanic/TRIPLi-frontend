import React, { useEffect, useState } from "react";
import { CartMultiCarouselComponent } from "../main.jsx/App";
import { Container, DesWraper, ImgContainer, Wraper } from "./cart";
import { campcar } from "../data/mockdata";
import { Link, useParams } from "react-router-dom";
import CartImg from "..//../assets/img-11.webp";
import CartSlides from "./slides";
import styled from "styled-components";
import CarImg from "..//..//assets/caravan-1.png";
import { useDispatch, useSelector } from "react-redux";
import { changeQuantity } from "../../redux/cart/cart";
import { API } from "../../address/address";

const NavCart = () => {
  const carts = useSelector((store) => store.cart.items);
  const [detail, setDetail] = useState([]);
  const [data, setData] = useState([]);
  const { productId, quantity } = carts.map((item) => item);
  const dispatch = useDispatch();
  const [ price, setPrice ] = useState([])

  const fetchAllData = async (setData) => {
    try {
      const [motorResponse, caravanResponse, tuningResponse, usedCarResponse] = await Promise.all([
        fetch(`${API}/motor`),
        fetch(`${API}/caravan`),
        fetch(`${API}/tuning`),
        fetch(`${API}/used-car`)
      ]);
  
      if (!motorResponse.ok || !caravanResponse.ok || !tuningResponse.ok || !usedCarResponse.ok) {
        throw new Error("Error fetching data 'frontend'");
      }
  
      const motorData = await motorResponse.json();
      const caravanData = await caravanResponse.json();
      const tuningData = await tuningResponse.json();
      const usedCarData = await usedCarResponse.json();
  
      const combinedData = [...motorData, ...caravanData, ...tuningData, ...usedCarData];
  
      setData(combinedData);
    } catch (error) {
      console.log("failed to fetch data", error);
    }
  };
  
  useEffect(() => {
    fetchAllData(setData);
  }, []);
  useEffect(() => {
    if (data.length > 0 && carts.length > 0) {
      const findDetail = carts.map((cartItem) => {
        return data.find((item) => item._id === cartItem.productId) || {};
      });
      setDetail(findDetail);

      // Initialize prices array
      const initialPrices = findDetail.map((item, index) => item.cost * carts[index].quantity);
      setPrice(initialPrices);
    }
  }, [data, carts]);

  const handleMinusQuantity = (e, productId, quantity, index) => {
    e.preventDefault();
    e.stopPropagation();

    const product = data.find(item => item._id === productId);
    if(!product)return
    const originalCost = product.cost
    dispatch(changeQuantity({
      productId: productId,
      quantity: quantity - 1
    }))
    setPrice(prevPrices => {
      const newPrices = [...prevPrices];
      newPrices[index] -= originalCost;
      return newPrices;
    });

  }
  const handlePlusQuantity = (e, productId, quantity, index) => {
    e.preventDefault();
    e.stopPropagation();

    const product = data.find(item => item._id === productId);
    if(!product)return
    const originalCost = product.cost
    dispatch(changeQuantity({
      productId: productId,
      quantity: quantity + 1
    }))
    // Update price state
    setPrice(prevPrices => {
      const newPrices = [...prevPrices];
      newPrices[index] += originalCost;
      return newPrices;
    });
  }
  return (
    <div style={{ marginBottom: "50px",  minHeight:'50dvh' }}>
      <Container $cart>
        <h1>Cart</h1>
        <h3>Cart items: {carts.length}</h3>
        {carts.map((item, index) => (
          <Link
            to={`/cart/${item.productId}`}
            style={{ width: "100%", textDecoration: "none" }}
          >
            <CellWrapper key={item.productId}>
              <img src={detail[index]?.image} alt="car image" />
              <InfoSec>
                <h3>
                  {detail[index]?.name} <h4>{price[index]} W</h4>
                </h3>
                <div>
                  <p>{detail[index]?.company} </p>
                  <div>
                    <button onClick={(e) => handlePlusQuantity(e, item.productId, item.quantity, index)}>+</button>
                    <p>{item.quantity}</p>
                    <button onClick={(e) => {handleMinusQuantity(e, item.productId, item.quantity, index);}}>-</button>
                  </div>
                </div>

                <b>
                  Location: <span>{detail[index]?.location}</span>
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
