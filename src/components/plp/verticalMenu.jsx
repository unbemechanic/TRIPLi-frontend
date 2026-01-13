import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cart";
import {
  SLinkV,
  ButtonFunction,
  PriceDescription,
  Star,
  ButtonSec,
  BLink,
  Buttons,
} from "./style";

export const VerticalMenuComponent = ({
  products = [],
  page,
  setPage,
  total,
  limit,
}) => {
  const { category } = useParams();
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
