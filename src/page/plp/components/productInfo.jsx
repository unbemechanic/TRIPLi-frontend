import React from "react";
import { RatingStars } from "./rating";
import {
  BookingButton,
  ProductInfoWrapper,
  Specification,
  SpecificationIcon,
} from "../styles/documentStyle.";
import { formatKRW } from "../../../utils/currency";
import BookingModal from "./bookingModal";

const ProductInfo = ({ value }) => {
  const [bookingModalOpen, setBookingModalOpen] = React.useState(false);
  const handleBooking = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setBookingModalOpen(!bookingModalOpen);
  };
  return (
    <ProductInfoWrapper style={{ height: "100%" }}>
      <RatingStars rating={value.rating} />
      <h2>{value.name}</h2>
      <p>{value.description}</p>
      <Specification $specific>
        <p>
          <SpecificationIcon $seat />
          Number of Seats: {value.passanger}
        </p>
        <p>
          <SpecificationIcon $transmission />
          Transmission Type: {value.transmission}
        </p>
        <p>
          <SpecificationIcon $license /> License plate: {value.license}
        </p>
        <p>
          <SpecificationIcon $category /> Category: {value.category}
        </p>
      </Specification>
      <Specification>
        <p className="cost-per-day">{formatKRW(value.costPerDay)} / Per day</p>
        <p>{formatKRW(value.costPerHour)} / Per hour</p>
      </Specification>
      <BookingButton onClick={handleBooking}>Book Now</BookingButton>
      {bookingModalOpen && <BookingModal close={handleBooking} value={value} />}
    </ProductInfoWrapper>
  );
};

export default ProductInfo;
