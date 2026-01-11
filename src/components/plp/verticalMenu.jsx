import React from "react";
import { Link, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart/cart";

// style
export const Star = styled(StarIcon)`
  color: rgb(255, 122, 0);
`;
export const SLinkV = styled(Link)`
  text-decoration: none;
  display: flex;
  width: 1050px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 5px 0px lightgray;
  column-gap: 30px;
  margin: 20px 0;
  box-sizing: border-box;
  margin-inline: auto;
  background-color: white;
  &:hover {
    transform: scale(1.02);
  }
  img {
    width: 250px;
    height: 140px;
    @media (max-width: 640px) {
      width: 30%;
      object-fit: contain;
    }
  }
  @media (max-width: 1200px) {
    width: 760px;
  }
  @media (max-width: 810px) {
    width: 90%;
  }
  @media (max-width: 560px) {
    column-gap: 10px;
  }
  @media (max-width: 520px) {
    /* flex-direction: column; */
    width: 80%;
    margin-left: 0;
    margin-inline: 0;
    /* padding-inline: 0; */
  }
`;
export const ButtonFunction = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-columns: 1fr 1fr;
  width: 70%;
  row-gap: 45px;
`;
export const ButtonSec = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr;
  justify-content: space-around;
  gap: 20px;
  button {
    flex: 1;
  }
`;

export const PriceDescription = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  h2,
  p {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  h2,
  h3,
  h5,
  p {
    font-family: Montserrat;
    font-style: normal;
    line-height: normal;
  }
  h2 {
    color: #006dab;
    font-size: calc(16px + (22 - 19) * ((100vw - 320px) / (1920 - 320)));
    font-weight: 700;
  }
  h3 {
    color: #373737;
    font-size: 18px;
    font-weight: 600;
  }
  h5,
  p {
    color: #373737;
    font-size: 12px;
    font-weight: 400;
  }
`;
export const BLink = styled(Link)`
  width: 40%;
`;
export const Buttons = styled.button`
  border: 1px solid #006dab;
  border-radius: 10px;
  color: #006dab;
  font-weight: 600;
  padding: 10px 20px;
  background-color: inherit;
  margin-right: 10px;
  width: 100%;
  min-width: fit-content;
  &:hover {
    background-color: #006dab;
    color: white;
    cursor: pointer;
  }
  &:focus {
    background-color: #006cab68;
  }
`;

export const VerticalMenuComponent = ({
  products = [],
  page,
  setPage,
  total,
  limit,
}) => {
  const { category } = useParams();
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleAddToCart = (id) => {
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
  };
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {products.map((value) => {
        return (
          <SLinkV
            to={`/product/detail/${category}/${value._id}`}
            key={value.id}
          >
            <img src={value?.photo || value?.image} />
            <ButtonFunction>
              <PriceDescription>
                <h3>{value.name}</h3>
                <h2>{value.cost}</h2>
                <h5>{value.company}</h5>
                <p>
                  <Star />
                  {value.rate}
                </p>
              </PriceDescription>
              <ButtonSec>
                <BLink to={`/cart/${value._id}`}>
                  <Buttons>Order</Buttons>
                </BLink>
                <Buttons
                  onClick={(e) => {
                    handleAddToCart(value._id);
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  Add to cart
                </Buttons>
              </ButtonSec>
            </ButtonFunction>
          </SLinkV>
        );
      })}
    </div>
  );
};

export default VerticalMenuComponent;

export const VerticalMenuCaravanComponent = ({ filter }) => {
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleAddToCart = (id) => {
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {filter.map((value) => {
        return (
          <SLinkV to={`/caravan/${value._id}`} key={value.id}>
            <img src={value?.photo || value?.image} />
            <ButtonFunction>
              <PriceDescription>
                <h3>{value.name}</h3>
                <h2>{value.cost}</h2>
                <h5>{value.company}</h5>
                <p>
                  <Star />
                  {value.rate}
                </p>
              </PriceDescription>
              <ButtonSec>
                <BLink to={`/caravan/cart/${value._id}`}>
                  <Buttons>Order</Buttons>
                </BLink>
                <Buttons
                  onClick={(e) => {
                    handleAddToCart(value._id);
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  Add to cart
                </Buttons>
              </ButtonSec>
            </ButtonFunction>
          </SLinkV>
        );
      })}
    </div>
  );
};
export const VerticalMenuTuningComponent = ({ filter }) => {
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleAddToCart = (id) => {
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "red",
      }}
    >
      {filter.map((value) => {
        return (
          <SLinkV to={`/tuning/${value._id}`} key={value._id}>
            <img src={value?.photo || value?.images} />
            <ButtonFunction>
              <PriceDescription>
                <h3>{value.name}</h3>
                <h2>{value.cost}</h2>
                <h5>{value.company}</h5>
                <p>
                  <Star />
                  {value.rate}
                </p>
              </PriceDescription>
              <ButtonSec>
                <BLink to={`/tuning/cart/${value._id}`}>
                  <Buttons>Order</Buttons>
                </BLink>
                <Buttons
                  onClick={(e) => {
                    handleAddToCart(value._id);
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  Add to cart
                </Buttons>
              </ButtonSec>
            </ButtonFunction>
          </SLinkV>
        );
      })}
    </div>
  );
};
export const VerticalMenuUsedCarComponent = ({ filter }) => {
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleAddToCart = (id) => {
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
      })
    );
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {filter.map((value) => {
        return (
          <SLinkV to={`/usedCar/${value._id}`} key={value._id}>
            <img src={value?.photo || value?.image} />
            <ButtonFunction>
              <PriceDescription>
                <h3>{value.name}</h3>
                <h2>{value.cost}</h2>
                <h5>{value.company}</h5>
                <p>
                  <Star />
                  {value.rate}
                </p>
              </PriceDescription>
              <ButtonSec>
                <BLink to={`/usedCar/cart/${value._id}`}>
                  <Buttons>Order</Buttons>
                </BLink>
                <Buttons
                  onClick={(e) => {
                    handleAddToCart(value._id);
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  Add to cart
                </Buttons>
              </ButtonSec>
            </ButtonFunction>
          </SLinkV>
        );
      })}
    </div>
  );
};
