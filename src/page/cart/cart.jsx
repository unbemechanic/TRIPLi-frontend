import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useWindowSize from "../../components/windowSize";

// style
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 1300px;
  margin-inline: auto;
  margin-top: 35px;
  gap: ${(props) => (props.$cart ? "20px" : "")};
  h1 {
    border-bottom: 2px solid #ff7a00;
    padding-inline: 5px;
  }
`;
export const ImgContainer = styled.div`
  width: 690px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  height: 500px;
  overflow: hidden;
  @media (max-width: 700px) {
    width: 80%;
    margin-inline: auto;
    height: auto;
  }
  p {
    padding: 15px 40px;
    background-color: #cac4c4a7;
    border-radius: 10px;
  }
  img {
    height: 100%;
    width: 100%;
    @media (max-width: 700px) {
      width: 100%;
      margin-inline: auto;
      object-fit: contain;
      height: auto;
    }
  }
`;
export const Wraper = styled.div`
  display: flex;
  margin-top: 30px;
  grid-gap: 35px;
  overflow: hidden;

  @media (max-width: 1300px) {
    flex-direction: column;
    overflow-x: scroll;
  }
`;
export const DesWraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 700px;
  overflow-y: auto;
  margin-bottom: 50px;
  position: relative;
  @media (max-width: 1300px) {
    width: 700px;
    overflow-y: hidden;
    height: auto;
  }
  @media (max-width: 700px) {
    width: 80%;
    margin-inline: auto;
  }
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
    @media (max-width: 1300px) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    @media (max-width: 500px) {
      font-size: 25px;
    }
  }
  h3 {
    color: var(--blue, #006dab);
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 20px;
    @media (max-width: 500px) {
      font-size: 20px;
      margin: 0;
    }
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

const CartMotorComponent = () => {
  const [data, setData] = useState([]);
  const [moveUp, setMoveUp] = useState(false);
  const scrollRef = useRef(null);
  const windowSize = useWindowSize();
  const wideWindow = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: window.innerHeight - 500,
        behavior: "smooth",
      });
    }
  };
  const smallWindow = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };
  const handleClick = () => {
    if (windowSize.width > 1300) {
      wideWindow();
    } else {
      smallWindow();
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5500/motor");
      if (!response.ok) {
        throw new Error("Error fetching data 'frontend'");
      }
      const motor = await response.json();
      setData(motor);
    } catch (error) {
      throw new Error("failed to fetch data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  let { id } = useParams();
  const separatedData = data.filter((item) => item._id == id);

  return (
    <Container>
      <h1>My Orders</h1>
      {separatedData.map((value) => {
        return (
          <Wraper key={value.id}>
            <ImgContainer>
              <img src={value.image} />
              {/* <p>Purchase price: <b>{value.cost} W</b></p> */}
            </ImgContainer>
            <DesWraper className="scrollable" ref={scrollRef}>
              <h2>
                {value.name}
                <h3>{value.cost} Won</h3>
              </h2>

              <h5>Description</h5>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
                voluptas sit delectus illum cumque cupiditate, explicabo
                pariatur aut consequuntur laborum ad esse eius assumenda tenetur
                similique placeat, corporis architecto recusandae.
              </p>
              <button
                className={`button-payment ${moveUp ? "move-up" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={handleClick}
              >
                Continue to payment
              </button>
              <h2>Enter Account Details</h2>
              <legend>First name</legend>
              <input type="text" placeholder="First name" />
              <legend>Last Name</legend>
              <input type="text" placeholder="Last Name" />
              <legend>Email</legend>
              <input type="email" placeholder="Your email" />
              <legend>Phone Number</legend>
              <input type="number" placeholder="Phone Number" />
              <h2>Card</h2>
              <legend>Name on card</legend>
              <input type="text" placeholder="Name on card" />
              <legend>Card Number</legend>
              <input type="number" placeholder="Card Number" />
              <legend>Expiration Mounth</legend>
              <input type="number" placeholder="01" />
              <legend>Expiration Year</legend>
              <input type="number" placeholder="2022" />
              <legend>CVV</legend>
              <input type="number" placeholder="CVV" />
              <legend>Zip-code</legend>
              <input type="number" placeholder="Zip-code" />
              <button
                style={{ cursor: "pointer" }}
                onClick={() =>
                  alert("Sorry this is demo website! You can not purchase (")
                }
              >
                Place Order
              </button>
            </DesWraper>
          </Wraper>
        );
      })}
    </Container>
  );
};

export default CartMotorComponent;
