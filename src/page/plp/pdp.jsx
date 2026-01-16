import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Seperated } from "../../style";
import { CarSpec, MainContainer } from "./styles/documentStyle.";
import BasicTabs from "../../materials/tab";
import "..//..//..//src/";
import ProductImage from "./components/productImage";
import ProductInfo from "./components/productInfo";

const DocumentsComponent = () => {
  let { id } = useParams();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://tripli-backend.onrender.com/motor/${id}`,
      );
      if (!response.ok) {
        throw new Error("Error fetching data 'frontend'");
      }
      const motor = await response.json();
      setData(motor);
    } catch (error) {
      console.log("failed to fetch data", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <Seperated key={data._id}>
        <div>
          <MainContainer>
            <CarSpec style={{ marginBottom: "80px", padding: "20px" }}>
              <ProductImage image={data.image} />
              <ProductInfo value={data} />
            </CarSpec>
          </MainContainer>
          <BasicTabs />
        </div>
      </Seperated>
    </div>
  );
};

export default DocumentsComponent;
