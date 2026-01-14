import React from "react";
import { Menu as MenuIcon } from "@mui/icons-material";

import {
  HorizontalFilter,
  VerticalFilterInput,
  FilterSec,
  InputSearch,
  WindowStyle,
  ListIconStyle,
} from "../../useState/stylesUse";

function FilterHeader({
  filteredData,
  isSmallScreen,
  handleOpen,
  searchTerm,
  setSearchTerm,
  horizontalMenuHandle,
  verticalMenuHandle,
}) {
  return (
    <HorizontalFilter>
      <div>
        <b>Item</b> <b style={{ color: "#006Dab" }}>{filteredData.length}</b>{" "}
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
          <ListIconStyle onClick={verticalMenuHandle} />
        </VerticalFilterInput>
      </FilterSec>
    </HorizontalFilter>
  );
}

export default FilterHeader;
