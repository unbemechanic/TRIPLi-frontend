import React, { useRef } from "react";
import "./style.css";
import {
  Container,
  DesWraper,
  ImgContainer,
  ScrollWindow,
  Wraper,
} from "./style";
import { useFetchData } from "components/custom hooks/useFetch";
import { useParams } from "react-router-dom";
import { formatKRW } from "utils/currency";

export const OverFlow = () => {
  const { id } = useParams();
  const accountRef = useRef(null);
  const scrollRef = useRef(null);
  const devURL = `tripli-api.inomjonov.site/motor/${id}`;
  const { data: value, loading, error } = useFetchData(devURL, []);

  const handleScrollUp = () => {
    if (accountRef.current) {
      accountRef.current?.scrollIntoView({
        behaviour: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Container>
      <h1>Order</h1>
      <Wraper>
        <ImgContainer>
          <img src={value.image} />
          <p>
            Purchase price:{" "}
            <b>
              {formatKRW(value.cost || value.costPerHour || value.costPerDay)}
            </b>
          </p>
        </ImgContainer>
        <div></div>
        <ScrollWindow>
          <DesWraper className="scrollable" ref={scrollRef}>
            <h2>{value.name}</h2>
            <h3>
              {formatKRW(value.cost || value.costPerHour || value.costPerDay)}
            </h3>
            <h5>Description</h5>
            <p>{value.description}</p>
            <button onClick={handleScrollUp}>Continue to payment</button>
            <h2 ref={accountRef}>Enter Account Details</h2>
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
            <button>Place Order</button>
          </DesWraper>
        </ScrollWindow>
        <div></div>
      </Wraper>
    </Container>
  );
};
export default OverFlow;
