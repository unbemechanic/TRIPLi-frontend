import { useEffect, useMemo, useState } from "react";

import { BodyDiv, IndentedDiv, MainBodyDiv, MotorBodyContainer } from "style";
import "index.css";
import ProductListMenuComponent from "components/plp/productList";
import VerticalMenuComponent from "components/plp/verticalMenu";
import { useMediaQuery } from "@mui/material";
import "materials/mui.css";
import { useFetchData } from "components/custom hooks/useFetch";
import useUniqueValues from "components/custom hooks/useUniqeValues";
import Hero from "components/hero/Hero";
import SidebarFilters from "components/plp/SidebarFilters";
import FilterHeader from "components/plp/SearchSection";
import LoadingOverlay from "components/general/loader";
import { useParams } from "react-router-dom";

const ProductListComponent = () => {
  const { category } = useParams();
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedLicenses, setSelectedLicenses] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(true);
  const [page, setPage] = useState(1);

  const dynamicCategory = useMemo(() => {
    if (!category) return "";
    if (category === "used-cars") return "used cars";
    return category;
  }, [category]);

  const buildQuery = () => {
    const params = new URLSearchParams();

    params.set("category", dynamicCategory);

    if (selectedCompanies.length)
      params.set("company", selectedCompanies.join(","));

    if (selectedLicenses.length)
      params.set("license", selectedLicenses.join(","));

    if (selectedPeople.length)
      params.set("passanger", selectedPeople.join(","));

    if (selectedLocations.length)
      params.set("location", selectedLocations.join(","));

    if (searchTerm) params.set("search", searchTerm);

    params.set("page", page);
    params.set("limit", 12);

    return params.toString();
  };

  const query = useMemo(
    () => buildQuery(),
    [
      dynamicCategory,
      selectedCompanies.join(","),
      selectedLicenses.join(","),
      selectedPeople.join(","),
      selectedLocations.join(","),
      searchTerm,
      page,
    ],
  );
  // const devURL = `https://tripli-api.inomjonov.site/motor?${query}`;
  const devURL = useMemo(
    () => `https://tripli-backend.onrender.com/motor?${query}`,
    [query],
  );
  const { data, loading } = useFetchData(devURL, []);

  const products = data?.data || [];

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1600px)").matches,
  );
  const [sidebar, setSidebar] = useState(false);
  const combinedData = useMemo(() => [...(products || [])], [products]);

  const horizontalMenuHandle = () => {
    setActive(true);
  };
  const verticalMenuHandle = () => {
    setActive(false);
  };
  const handleChange = (setter) => (value) => {
    setter((prevSelected) => {
      const isSelected = prevSelected.includes(value);
      return isSelected
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value];
    });
  };

  const handleCompanyChange = handleChange(setSelectedCompanies);
  const handleLicenseChange = handleChange(setSelectedLicenses);
  const handlePeopleChange = handleChange(setSelectedPeople);
  const handleLocationChange = handleChange(setSelectedLocations);

  const uniqueCompanies = useUniqueValues(combinedData, "company");
  const uniqueLicenses = useUniqueValues(combinedData, "license");
  const uniquePeople = useUniqueValues(combinedData, "passanger");
  const uniqueLocations = useUniqueValues(combinedData, "location");

  const isSmallScreen = useMediaQuery("(max-width:1600px)");

  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(max-width: 1600px)");
  //   const handleMediaChange = (e) => setIsMobile(e.matches);

  //   mediaQuery.addEventListener("change", handleMediaChange);

  //   return () => {
  //     mediaQuery.removeEventListener("change", handleMediaChange);
  //   };
  // }, []);

  // Sync server results into filteredData so the header/show counts reflect server-side paging
  useEffect(() => {
    setFilteredData(products);
  }, [products]);

  useEffect(() => {
    setPage(1);
  }, []);

  const handleOpen = () => {
    if (isMobile) {
      setSidebar(true);
    }
  };

  const handleClose = () => {
    if (isMobile && sidebar) {
      setSidebar(false);
    }
  };

  return (
    <div>
      <BodyDiv>
        <Hero />
        <IndentedDiv $motorBody>
          <MotorBodyContainer>
            <SidebarFilters
              sidebar={sidebar}
              isSmallScreen={isSmallScreen}
              handleClose={handleClose}
              uniqueCompanies={uniqueCompanies}
              selectedCompanies={selectedCompanies}
              handleCompanyChange={handleCompanyChange}
              uniquePeople={uniquePeople}
              selectedPeople={selectedPeople}
              handlePeopleChange={handlePeopleChange}
              uniqueLicenses={uniqueLicenses}
              selectedLicenses={selectedLicenses}
              handleLicenseChange={handleLicenseChange}
              uniqueLocations={uniqueLocations}
              selectedLocations={selectedLocations}
              handleLocationChange={handleLocationChange}
            />
            <MainBodyDiv>
              <FilterHeader
                filteredData={filteredData}
                isSmallScreen={isSmallScreen}
                handleOpen={handleOpen}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                horizontalMenuHandle={horizontalMenuHandle}
                verticalMenuHandle={verticalMenuHandle}
              />
              {active ? (
                <ProductListMenuComponent
                  products={products}
                  page={page}
                  setPage={setPage}
                  total={data?.total ?? 0}
                  limit={12}
                />
              ) : (
                <VerticalMenuComponent
                  products={products}
                  page={page}
                  setPage={setPage}
                  total={data?.total ?? 0}
                  limit={12}
                />
              )}
            </MainBodyDiv>
          </MotorBodyContainer>
        </IndentedDiv>
      </BodyDiv>
      {loading && <LoadingOverlay />}
    </div>
  );
};

export default ProductListComponent;
