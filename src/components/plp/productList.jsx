import { Link, useNavigate, useParams } from "react-router-dom";
import Img from "assets/caravan-8.png";
import { formatKRW } from "utils/currency";
import { useCart } from "contextAPI/Context";
import {
  Buttons,
  Container,
  FunctionButtons,
  Rating,
  SLink,
  Star,
} from "useState/stylesUse";
import {
  PageButton,
  PaginationContainer,
} from "page/plp/styles/documentStyle.";

const ProductListMenuComponent = ({
  products = [],
  page,
  setPage,
  total,
  limit,
}) => {
  const { category } = useParams();
  const { handleAddToCart } = useCart();
  const navigate = useNavigate();

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Container>
        {products.map((value) => {
          return (
            <div key={value._id}>
              <SLink to={`/product/detail/${category}/${value._id}`}>
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
                    <Buttons
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/cart/${value._id}`);
                      }}
                    >
                      Order
                    </Buttons>
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
      {totalPages > 1 && (
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <PageButton
                $active={page === pageNumber}
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </PageButton>
            )
          )}
        </PaginationContainer>
      )}
    </>
  );
};

export default ProductListMenuComponent;
