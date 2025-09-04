import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

import {
  CompareDiv,
  ComparingCar,
  FilterCheckbox,
  FilterLabel,
  MainSideBar,
  MainSidebarWrapper,
  MotorNavIn,
  NavBoxStyle,
  NavButton,
} from "../../style";

function SidebarFilters({
  sidebar,
  isSmallScreen,
  handleClose,
  uniqueCompanies,
  selectedCompanies,
  handleCompanyChange,
  uniquePeople,
  selectedPeople,
  handlePeopleChange,
  uniqueLicenses,
  selectedLicenses,
  handleLicenseChange,
  uniqueLocations,
  selectedLocations,
  handleLocationChange,
}) {
  return (
    <MainSidebarWrapper sidebar={sidebar} onClick={handleClose}>
      <MainSideBar sidebar={sidebar} onClick={(e) => e.stopPropagation()}>
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

            {/* === Cost of Car === */}
            <Accordion
              defaultExpanded
              sx={{ backgroundColor: "inherit", boxShadow: "none" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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

            {/* === Brand === */}
            <Accordion
              defaultExpanded
              sx={{ backgroundColor: "inherit", boxShadow: "none" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <b>Brand</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {uniqueCompanies.map((company, index) => (
                  <FilterLabel key={company}>
                    <FilterCheckbox
                      id={`company-${index}`}
                      type="checkbox"
                      checked={selectedCompanies.includes(company)}
                      onChange={() => handleCompanyChange(company)}
                    />
                    {company}
                  </FilterLabel>
                ))}
              </AccordionDetails>
            </Accordion>

            {/* === Travelers === */}
            <Accordion
              defaultExpanded
              sx={{ backgroundColor: "inherit", boxShadow: "none" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <b>Number of travelers</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {uniquePeople.map((people) => (
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

            {/* === License === */}
            <Accordion
              defaultExpanded
              sx={{ backgroundColor: "inherit", boxShadow: "none" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <b>Licence type</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {uniqueLicenses.map((value) => (
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

            {/* === Location === */}
            <Accordion
              defaultExpanded
              sx={{ backgroundColor: "inherit", boxShadow: "none" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <b>Location</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {uniqueLocations.map((value) => (
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

        {/* Buttons */}
        <div style={{ display: "flex", gap: "20px" }}>
          <NavButton>Cancel</NavButton>
          <NavButton $search>Search</NavButton>
        </div>

        {/* Compare section */}
        <ComparingCar $main>
          <div>Compare</div>
          <ComparingCar>
            <CompareDiv $first />
            <CompareDiv $second />
            <CompareDiv $third />
          </ComparingCar>
        </ComparingCar>
      </MainSideBar>
    </MainSidebarWrapper>
  );
}

export default SidebarFilters;
