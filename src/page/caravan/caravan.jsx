import React, { useEffect, useState } from "react";
import { campcar } from "../data/mockdata";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  BodyDiv,
  CompareDiv,
  ComparingCar,
  FilterButton,
  FilterCheckbox,
  FilterLabel,
  IndentedDiv,
  MainBodyDiv,
  MainSideBar,
  MainSidebarWrapper,
  MotorBodyContainer,
  MotorH,
  MotorHome,
  MotorNavIn,
  NavBoxStyle,
  NavButton,
} from "../../style";
import "..//..//index.css";
import {
  ExpandStyle,
  FilterSec,
  InputSearch,
  ListIconStyle,
  WindowStyle,
} from "../../useState/useState";
import {
  HorizontalFilter,
  VerticalFilterInput,
} from "../../useState/stylesUse";
import  { GridMenuCaravanComponent } from "../../useState/gridMenu";
import { VerticalMenuCaravanComponent } from "../../useState/verticalMenu";
import SwipeableTemporaryDrawer2 from "../../materials/sidebarMenu";
import { Accordion, useMediaQuery } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "..//..//materials/mui.css";
import { API } from "../../address/address";



const CaravanComponent = () => {
  const mock = campcar.maindata.map(item => item.car);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedLicenses, setSelectedLicenses] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [active, setActive] = useState(true)
  const fetchData = async (setData) => {
    try {
      const response = await fetch(`https://api-camper.inomjonov.site/caravan`);
      if (!response.ok) {
        throw new Error("Error fetching data 'frontend'");
      }
      const motor = await response.json();
      const combinedData = [...motor, ...mock]
      setData(combinedData);
    } catch (error) {
     throw new Error('fetching data error caravan!!!')
    }
  };
  
  const getUniqueValues = (data, key) => {
    return Array.from(
      new Set(data.map((item) => item[key]? item[key].toString().toLowerCase() : ''))
    ).map(
      (value) =>
        data.find((item) => item[key]?.toString().toLowerCase() === value)?.[key] || ''
    );
  };

  useEffect(() => {
    fetchData(setData);
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(
        (item) =>
          (selectedNames.length === 0 || selectedNames.includes(item.name)) &&
          (selectedCompanies.length === 0 || selectedCompanies.includes(item.company)) &&
          (selectedLicenses.length === 0 || selectedLicenses.includes(item.license)) &&
          (selectedPeople.length === 0 || selectedPeople.includes(item.passanger)) &&
          (selectedLocations.length === 0 || selectedLocations.includes(item.location)) &&
          (searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [data, selectedNames, selectedCompanies, selectedLicenses, selectedPeople, selectedLocations, searchTerm]);
  const horizontalMenuHandle = () => {
    setActive(true);
  };
  const verticalMenuHangle = () => {
    setActive(false);
  };
  const handleChange = (setter) => (value) => {
    setter((prevSelected) => {
      const isSelected = prevSelected.includes(value);
      return isSelected ? prevSelected.filter((item) => item !== value) : [...prevSelected, value];
    });
  };

  const handleNameChange = handleChange(setSelectedNames);
  const handleCompanyChange = handleChange(setSelectedCompanies);
  const handleLicenseChange = handleChange(setSelectedLicenses);
  const handlePeopleChange = handleChange(setSelectedPeople);
  const handleLocationChange = handleChange(setSelectedLocations);

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchTerm(searchQuery);
  };
  const uniqueCompanies = getUniqueValues(data, 'company');
  const uniqueLicenses = getUniqueValues(data, 'license');
  const uniquePeople = getUniqueValues(data, 'passanger');
  const uniqueLocations = getUniqueValues(data, 'location');
  const uniqueCarNames = getUniqueValues(data, 'name');
  const [sidebar, setSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1430px)").matches
  );
  const isSmallScreen = useMediaQuery("(max-width:1430px)");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1430px)");
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
        <MotorHome $caravan>
          <MotorH $home>Home/Caravan</MotorH>
          <MotorH $ranges>Our ranges</MotorH>
          <MotorH $motor>Caravan</MotorH>
        </MotorHome>
        <IndentedDiv $motorBody>
          <MotorBodyContainer>
          <MainSidebarWrapper  sidebar={sidebar} onClick={handleClose}>
              <MainSideBar sidebar={sidebar} onClick={(e)=> e.stopPropagation()}>
                <NavBoxStyle>
                  <div style={{ position: "relative" }}>
                    {isSmallScreen && (
                      <CloseIcon
                        sx={{
                          display: "block",
                          position: "fixed",
                          left: "350px",
                          top: "110px",
                          cursor: "pointer",
                        }}
                        onClick={handleClose}
                      />
                    )}
                    <Accordion
                      defaultExpanded
                      sx={{
                        backgroundColor: "inherit",
                        boxShadow:
                          "0px 2px 1px -1px rgba(0, 0, 0, 0), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 0px 3px 0px rgba(0, 0, 0, 0)",
                      }}
                    >
                      <AccordionSummary
                        sx={{
                          backgroundColor: "inherits",
                          border: "none",
                          boxShadow:
                            "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 1px 3px 0px rgba(0, 0, 0, 0)",
                          marginBottom: "30px",
                        }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>
                          <b>Cost of Car</b>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div style={{ display: "flex", gap: "30px" }}>
                          <label style={{ display: "grid", gap: "5px" }}>
                            from
                            <MotorNavIn type="number" />
                          </label>
                          <label style={{ display: "grid" }}>
                            to
                            <MotorNavIn type="number" />
                          </label>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      defaultExpanded
                      sx={{
                        backgroundColor: "inherit",
                        boxShadow:
                          "0px 2px 1px -1px rgba(0, 0, 0, 0), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 0px 3px 0px rgba(0, 0, 0, 0)",
                      }}
                    >
                      <AccordionSummary
                        sx={{
                          backgroundColor: "inherits",
                          borderTop: "none",
                          boxShadow:
                            "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 1px 3px 0px rgba(0, 0, 0, 0)",
                          marginBottom: "30px",
                        }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>
                          <b>Brand</b>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {uniqueCompanies.map((company, index) => (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                            key={company}
                          >
                            <FilterLabel key={company}>
                              <FilterCheckbox
                                id={`company-${index}`}
                                type="checkbox"
                                checked={selectedCompanies.includes(company)}
                                onChange={() => {
                                  handleCompanyChange(company);
                                }}
                              />
                              {company}
                            </FilterLabel>
                          </div>
                        ))}
                      </AccordionDetails>
                    </Accordion>

                    <Accordion
                      defaultExpanded
                      sx={{
                        backgroundColor: "inherit",
                        boxShadow:
                          "0px 2px 1px -1px rgba(0, 0, 0, 0), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 0px 3px 0px rgba(0, 0, 0, 0)",
                      }}
                    >
                      <AccordionSummary
                        sx={{
                          backgroundColor: "inherits",
                          borderTop: "none",
                          boxShadow:
                            "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 1px 3px 0px rgba(0, 0, 0, 0)",
                          marginBottom: "30px",
                        }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>
                          <b>Number of travelers</b>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {uniquePeople.map((people, index) => (
                          <FilterLabel key={people}>
                            <FilterCheckbox
                              type="checkbox"
                              checked={selectedPeople.includes(people)}
                              onChange={() => handlePeopleChange(people)}
                            />
                            {people}
                          </FilterLabel>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      defaultExpanded
                      sx={{
                        backgroundColor: "inherit",
                        boxShadow:
                          "0px 2px 1px -1px rgba(0, 0, 0, 0), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 0px 3px 0px rgba(0, 0, 0, 0)",
                      }}
                    >
                      <AccordionSummary
                        sx={{
                          backgroundColor: "inherits",
                          borderTop: "none",
                          boxShadow:
                            "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 1px 3px 0px rgba(0, 0, 0, 0)",
                          marginBottom: "30px",
                        }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>
                          <b>Licence type</b>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {uniqueLicenses.map((value, index) => (
                          <FilterLabel key={value}>
                            <FilterCheckbox
                              type="checkbox"
                              checked={selectedLicenses.includes(value)}
                              onChange={() => handleLicenseChange(value)}
                            />
                            {value}
                          </FilterLabel>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      defaultExpanded
                      sx={{
                        backgroundColor: "inherit",
                        boxShadow:
                          "0px 2px 1px -1px rgba(0, 0, 0, 0), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 0px 3px 0px rgba(0, 0, 0, 0)",
                      }}
                    >
                      <AccordionSummary
                        sx={{
                          backgroundColor: "inherits",
                          borderTop: "none",
                          boxShadow:
                            "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 1px 3px 0px rgba(0, 0, 0, 0)",
                          marginBottom: "50px",
                        }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>
                          <b>Location</b>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {uniqueLocations.map((value, index) => (
                          <FilterLabel key={value}>
                            <FilterCheckbox
                              type="checkbox"
                              checked={selectedLocations.includes(value)}
                              onChange={() => handleLocationChange(value)}
                            />
                            {value}
                          </FilterLabel>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </NavBoxStyle>
                <div style={{ display: "flex", gap: "20px" }}>
                  <NavButton>Cancel</NavButton>
                  <NavButton $search>Search</NavButton>
                </div>
                <ComparingCar $main>
                  <div>Compare</div>
                  <ComparingCar>
                    <CompareDiv $first></CompareDiv>
                    <CompareDiv $second></CompareDiv>
                    <CompareDiv $third></CompareDiv>
                  </ComparingCar>
                </ComparingCar>
              </MainSideBar>
            </MainSidebarWrapper>
            <MainBodyDiv>
              {/* <UseStateComponent/> */}
              <div>
                <HorizontalFilter>
                  <div>
                    <b>Item</b>{" "}
                    <b style={{ color: "#006Dab" }}>{filteredData.length}</b>{" "}
                    {isSmallScreen && (
                      <MenuIcon
                        sx={{ cursor: "pointer", display: "block" }}
                        onClick={handleOpen}
                      />
                    )}
                  </div>
                  <FilterSec>
                    <div>
                      <VerticalFilterInput $inputs>
                        <InputSearch
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Type to search"
                        />
                      </VerticalFilterInput>
                      
                    </div>
                    <VerticalFilterInput $menu>
                      <WindowStyle onClick={horizontalMenuHandle} />
                      <ListIconStyle onClick={verticalMenuHangle} />
                    </VerticalFilterInput>
                  </FilterSec>
                </HorizontalFilter>
                {active ? (
                  <GridMenuCaravanComponent filter={filteredData} /> 
                ) : (
                  <VerticalMenuCaravanComponent filter={filteredData} />
                )}
              </div>
            </MainBodyDiv>
          </MotorBodyContainer>
        </IndentedDiv>
      </BodyDiv>
    </div>
  );
};

export default CaravanComponent;
