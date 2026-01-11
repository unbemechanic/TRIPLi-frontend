import React from "react";
import menuList from "../../page/data/webControl/menulList.json";
import { DirectH, NavigationWrapper } from "style";
import { SLink } from "page/linkStyle";
import { useCart } from "contextAPI/Context";

const DropdownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="20px"
    viewBox="0 -960 960 960"
    width="20px"
    fill="gray"
  >
    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
  </svg>
);

const NavigationMenu = () => {
  const { handleNavChange } = useCart();
  return (
    <NavigationWrapper>
      {menuList.map((item, index) => (
        <SLink to={item.url} key={index} style={{ flexDirection: "row" }}>
          {item.title}
          {index < 4 && <DropdownIcon />}
        </SLink>
      ))}
    </NavigationWrapper>
  );
};

export default NavigationMenu;
