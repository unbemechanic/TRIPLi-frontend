import { useState } from "react";
import { Link } from "react-router-dom";
import Img from "..//assets/caravan-8.png";
import { formatKRW } from "../utils/currency";
import { useCart } from "../contextAPI/cartContext";
import {
  Buttons,
  Container,
  ExpandButton,
  FunctionButtons,
  Rating,
  SLink,
  Star,
} from "./stylesUse";

const ProductListMenuComponent = ({ filter }) => {
  const { handleAddToCart } = useCart();
  const [visibleCount, setVisibleCount] = useState(20);

  const handleExpand = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  const visibleProducts = filter.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < filter.length;

  return (
    <>
      <Container>
        {visibleProducts.map((value) => {
          return (
            <div key={value.id}>
              <SLink to={`/motor/${value._id}`}>
                <img src={value.image || value.photo || Img} />
                <FunctionButtons>
                  <div className="title">
                    <h3>{value.name}</h3>
                    {value.company}
                  </div>
                  <Rating>
                    <h1>{formatKRW(value.cost)}</h1>
                    <Star />
                    {value.rate}
                  </Rating>
                  <div className="row">
                    <Link to={`/cart/${value._id}`}>
                      <Buttons>Order</Buttons>
                    </Link>
                    <Buttons
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddToCart(value._id);
                      }}
                    >
                      Add to Cart
                    </Buttons>
                  </div>
                </FunctionButtons>
              </SLink>
            </div>
          );
        })}
      </Container>
      {hasMoreProducts && (
        <ExpandButton onClick={handleExpand}>
          Expand ({filter.length - visibleCount} more cars)
        </ExpandButton>
      )}
    </>
  );
};

export default ProductListMenuComponent;
