import React from "react";
import { PDPImage } from "../styles/documentStyle.";

const ProductImage = ({ image }) => {
  return <PDPImage src={image} alt="car-image" />;
};

export default ProductImage;
