import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Seperated } from "../../style";
import { CarSpec, MainContainer } from "./styles/documentStyle.";
import BasicTabs from "../../materials/tab";
import "..//..//..//src/";
import ProductImage from "./components/productImage";
import ProductInfo from "./components/productInfo";

const DocumentsComponent = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5500/motor`);
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
  let { id } = useParams();
  const separatedData = data.filter((item) => item._id == id);
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      {separatedData.map((value) => {
        return (
          <Seperated key={value.id}>
            <div>
              <MainContainer>
                <CarSpec style={{ marginBottom: "80px", padding: "20px" }}>
                  <ProductImage image={value.image} />
                  <ProductInfo value={value} />
                </CarSpec>
              </MainContainer>
              <BasicTabs />
            </div>
          </Seperated>
        );
      })}
    </div>
  );
};

export default DocumentsComponent;
