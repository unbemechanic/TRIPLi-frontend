import React, { useState } from "react";
import GridMenuComponent from "../components/plp/productList";
import VerticalMenuComponent from "../components/plp/verticalMenu";
import { campcar } from "../page/data/mockdata";
import { FilterButton } from "../style";
import SwipeableTemporaryDrawer2 from "../materials/sidebarMenu";
import {
  FilterSec,
  HorizontalFilter,
  VerticalFilterInput,
  InputSearch,
  ExpandStyle,
  WindowStyle,
  ListIconStyle,
} from "./stylesUse";

// styles

const UseStateComponent = () => {
  const [active, setActive] = useState(true);
  const horizontalMenuHandle = () => {
    setActive(true);
  };
  const verticalMenuHangle = () => {
    setActive(false);
  };
  const data = campcar.maindata;
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedLicenses, setSelectedLicenses] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  //grid data
  const [filter, setFilter] = useState(data);
  const handleChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setFilter(
      data.filter((campcar) =>
        campcar.car.name.toLowerCase().includes(searchQuery)
      )
    );
  };

  const filteredData = filter.filter(
    (item) =>
      (selectedNames.length === 0 || selectedNames.includes(item.car.name)) &&
      (selectedCompanies.length === 0 ||
        selectedCompanies.includes(item.car.company)) &&
      (selectedLicenses.length === 0 ||
        selectedLicenses.includes(item.car.license)) &&
      (selectedPeople.length === 0 ||
        selectedPeople.includes(item.car.people)) &&
      (selectedLocations.length === 0 ||
        selectedLocations.includes(item.car.location))
  );

  return (
    <div>
      <HorizontalFilter style={{ backgroundColor: "red" }}>
        <div>
          <b>Item</b> <b style={{ color: "#006Dab" }}>{filteredData.length}</b>{" "}
          <FilterButton>
            <SwipeableTemporaryDrawer2 />
          </FilterButton>
        </div>
        <FilterSec>
          <div>
            <VerticalFilterInput $inputs>
              <InputSearch
                type="text"
                onChange={handleChange}
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
  );
};

export default UseStateComponent;
