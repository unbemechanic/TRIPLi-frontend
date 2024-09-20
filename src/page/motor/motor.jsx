import React, { useEffect, useState } from "react";
import { campcar } from "../data/mockdata";
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
  MotorBodyContainer,
  MotorH,
  MotorHome,
  MotorNavIn,
  NavBoxStyle,
  NavButton,
} from "../../style";
import AccordionExpandDefault from "../../materials/arcadion";
import "..//..//index.css";
import UseStateComponent, {
  ExpandStyle,
  FilterSec,
  InputSearch,
  ListIconStyle,
  WindowStyle,
} from "../../useState/useState";
import Maping from "../../maping";
import {
  HorizontalFilter,
  VerticalFilterInput,
} from "../../useState/stylesUse";
import GridMenuComponent from "../../useState/gridMenu";
import VerticalMenuComponent from "../../useState/verticalMenu";
import SwipeableTemporaryDrawer2 from "../../materials/sidebarMenu";
import { Accordion, selectClasses } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "..//..//materials/mui.css";
import SizeCheckboxes from "../../materials/checkbox";



const MotorComponent = () => {
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
      const response = await fetch("http://localhost:5500/motor");
      if (!response.ok) {
        throw new Error("Error fetching data 'frontend'");
      }
      const motor = await response.json();
      const combinedData = [...motor, ...mock]
      setData(combinedData);
      console.log(motor);
    } catch (error) {
      console.log("failed to fetch data", error);
    }
  };
  
  const getUniqueValues = (data, key) => {
    return Array.from(
      new Set(data.map((item) => item[key]?.trim().toLowerCase()))
    ).map(
      (value) =>
        data.find((item) => item[key]?.trim().toLowerCase() === value)[key]
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
  

  return (
    <div>
      <BodyDiv>
        <MotorHome>
          <MotorH $home>Home/Motors</MotorH>
          <MotorH $ranges>Our ranges</MotorH>
          <MotorH $motor>Motors</MotorH>
        </MotorHome>
        <IndentedDiv $motorBody>
          <MotorBodyContainer>
            <MainSideBar>
              <NavBoxStyle>
                <div>
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
                                console.log("hello");
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
            <MainBodyDiv>
              {/* <UseStateComponent/> */}
              <div>
                <HorizontalFilter>
                  <div>
                    <b>Item</b>{" "}
                    <b style={{ color: "#006Dab" }}>{filteredData.length}</b>{" "}
                    <FilterButton>
                      <SwipeableTemporaryDrawer2 />
                    </FilterButton>
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
                      <VerticalFilterInput $inputs>
                        <input style={{ width: "40px" }} placeholder="60" />
                        <ExpandStyle />
                      </VerticalFilterInput>
                    </div>
                    <VerticalFilterInput $menu>
                      <WindowStyle onClick={horizontalMenuHandle} />
                      <ListIconStyle onClick={verticalMenuHangle} />
                    </VerticalFilterInput>
                  </FilterSec>
                </HorizontalFilter>
                {active ? (
                  <GridMenuComponent filter={filteredData} />
                ) : (
                  <VerticalMenuComponent filter={filteredData} />
                )}
              </div>
            </MainBodyDiv>
          </MotorBodyContainer>
        </IndentedDiv>
      </BodyDiv>
    </div>
  );
};

export default MotorComponent;
