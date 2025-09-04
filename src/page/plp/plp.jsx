import { useEffect, useState } from "react";
import { campcar } from "../data/mockdata";

import {
  BodyDiv,
  IndentedDiv,
  MainBodyDiv,
  MotorBodyContainer,
} from "../../style";
import "..//..//index.css";
import ProductListMenuComponent from "../../useState/productList";
import VerticalMenuComponent from "../../useState/verticalMenu";
import { useMediaQuery } from "@mui/material";
import "..//..//materials/mui.css";
import { API } from "../../address/address";
import { useFetchData } from "../../components/custom hooks/useFetch";
import useUniqueValues from "../../components/custom hooks/useUniqeValues";
import Hero from "../../components/hero/Hero";
import SidebarFilters from "../../components/plp/SidebarFilters";
import FilterHeader from "../../components/plp/SearchSection";

const ProductListComponent = () => {
  const devURL = `http://localhost:5500/motor`;
  const mock = campcar.maindata.map((item) => item.car);
  const { data: fetchedData, loading, error } = useFetchData(devURL, []);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedLicenses, setSelectedLicenses] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(true);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1600px)").matches
  );
  const [sidebar, setSidebar] = useState(false);
  const combinedData = [...fetchedData, ...mock];
  const API = "https://api-camper.inomjonov.site/motor";

  useEffect(() => {
    setFilteredData(
      combinedData.filter(
        (item) =>
          (selectedNames.length === 0 || selectedNames.includes(item.name)) &&
          (selectedCompanies.length === 0 ||
            selectedCompanies.includes(item.company)) &&
          (selectedLicenses.length === 0 ||
            selectedLicenses.includes(item.license)) &&
          (selectedPeople.length === 0 ||
            selectedPeople.includes(item.passanger)) &&
          (selectedLocations.length === 0 ||
            selectedLocations.includes(item.location)) &&
          (searchTerm === "" ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [
    combinedData,
    selectedNames,
    selectedCompanies,
    selectedLicenses,
    selectedPeople,
    selectedLocations,
    searchTerm,
  ]);
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

  const handleNameChange = handleChange(setSelectedNames);
  const handleCompanyChange = handleChange(setSelectedCompanies);
  const handleLicenseChange = handleChange(setSelectedLicenses);
  const handlePeopleChange = handleChange(setSelectedPeople);
  const handleLocationChange = handleChange(setSelectedLocations);

  const uniqueCompanies = useUniqueValues(combinedData, "company");
  const uniqueLicenses = useUniqueValues(combinedData, "license");
  const uniquePeople = useUniqueValues(combinedData, "passanger");
  const uniqueLocations = useUniqueValues(combinedData, "location");

  const isSmallScreen = useMediaQuery("(max-width:1600px)");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1600px)");
    const handleMediaChange = (e) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
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
                <ProductListMenuComponent filter={filteredData} />
              ) : (
                <VerticalMenuComponent filter={filteredData} />
              )}
            </MainBodyDiv>
          </MotorBodyContainer>
        </IndentedDiv>
      </BodyDiv>
    </div>
  );
};

export default ProductListComponent;
