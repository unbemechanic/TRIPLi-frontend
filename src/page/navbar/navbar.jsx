import React, { useEffect, useState } from "react";
import {
  Header,
  IndentedDiv,
  NavDisSec,
  NavDisSecLang,
  TripliLogo,
} from "../../style";
import RightSideSwipeableTemporaryDrawer from "materials/navbarMenu";
import { Link } from "react-router-dom";

// cart imports
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import NavigationMenu from "components/navigation/NavigationMenu";
import { useCart } from "contextAPI/Context";

// cart style
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: -8,
    border: `2px solid #FF7A00`,
    padding: "0 4px",
    backgroundColor: "#FF7A00",
    height: "25px",
    width: "25px",
    borderRadius: "50%",
  },
}));
const CartIcon = styled(ShoppingCartIcon)`
  @media (max-width: 1300px) {
    margin-left: 50px;
  }
`;

// cart
function CustomizedCart() {
  const { carts } = useCart();
  return (
    <IconButton
      sx={{ color: "#006DAB", width: "20px", boxSizing: "border-box" }}
      aria-label="cart"
    >
      <CartIcon />
      {carts?.items?.length > 0 ? (
        <StyledBadge badgeContent={carts?.items?.length} color="secondary" />
      ) : null}
    </IconButton>
  );
}

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [under1300, setUnder1300] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1300px)");
    const handleMediaQueryChange = (event) => setUnder1300(event.matches);

    handleMediaQueryChange(mediaQuery); // Check initial size
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Clean up the event listener on component unmount
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  });
  return (
    <div
      style={{
        backgroundColor: "white",
        position: "sticky",
        top: "0",
        width: "100vw",
        zIndex: "9988",
      }}
    >
      <IndentedDiv>
        <Header>
          <Link style={{ textDecoration: "none" }} to="/">
            <TripliLogo />
            <div></div>
          </Link>
          <NavigationMenu />
          <RightSideSwipeableTemporaryDrawer />
          <NavDisSecLang>
            {currentUser ? (
              <Link
                to="/cart"
                style={{
                  marginRight: "0px",
                  width: "50px",
                  position: under1300 ? "absolute" : "unset",
                  right: "110px",
                }}
              >
                <CustomizedCart />
              </Link>
            ) : (
              ""
            )}
            {currentUser ? (
              <Link
                style={{
                  position: under1300 ? "absolute" : "unset",
                  right: "80px",
                  width: "35px",
                }}
                to={"/profile"}
              >
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  style={{
                    height: "35px",
                    borderRadius: "50%",
                    marginRight: "0px",
                    width: "35px",
                  }}
                />
              </Link>
            ) : (
              <Link
                to={"/login"}
                style={{
                  color: "black",
                  textDecoration: "none",
                  backgroundColor: "#3bcbe460",
                  padding: "5px 10px",
                  borderRadius: "7px",
                  border: "1px solid #3bcbe4a5",
                }}
              >
                Sign in
              </Link>
            )}

            <NavDisSec>
              <label htmlFor="lang">
                <select id="lang" name="lang">
                  <option value="English">En</option>
                  <option value="Russian">Ru</option>
                  <option value="Uzbek">Uzb</option>
                </select>
              </label>
            </NavDisSec>
          </NavDisSecLang>
        </Header>
      </IndentedDiv>
    </div>
  );
};

export default Navbar;
