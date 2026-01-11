import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";

import { DisNavMenu, DisNavMenu2, MenuButton } from "../style";
import { SLink } from "../page/linkStyle";
import { useDispatch } from "react-redux";
import SignOut from "../components/user/signOut";

const MENU_ITEMS = [
  { label: "Motor", path: "/vehicles", withIcon: true },
  { label: "Caravan", path: "/vehicles", withIcon: true },
  { label: "Tuning", path: "/vehicles", withIcon: true },
  { label: "Used Cars", path: "/vehicles", withIcon: true },
  { label: "Camping Place", path: "/camping", withIcon: false },
];

const ArrowIcon = () => (
  <svg
    style={{ transform: "rotate(90deg)" }}
    xmlns="http://www.w3.org/2000/svg"
    height="25px"
    viewBox="0 -960 960 960"
    width="25px"
    fill="gray"
  >
    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
  </svg>
);

export default function RightSideSwipeableTemporaryDrawer() {
  const anchor = "right";
  const [state, setState] = React.useState({
    right: false,
  });
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(SignOut());
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const renderMenuItem = ({ label, path, withIcon }) => {
    const Content = withIcon ? DisNavMenu : DisNavMenu2;

    return (
      <SLink to={path} key={label}>
        <Content>
          {withIcon && <ArrowIcon />}
          {label}
        </Content>
      </SLink>
    );
  };
  return (
    <>
      <MenuButton onClick={toggleDrawer("right", true)} />
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
        sx={{ zIndex: 9999999 }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer("right", false)}
          onKeyDown={toggleDrawer("right", false)}
        >
          <List
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              paddingTop: "30px",
            }}
          >
            {MENU_ITEMS.map(renderMenuItem)}

            <DisNavMenu2 onClick={handleLogout}>Log out</DisNavMenu2>
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );

  // const list = (anchor) => (
  //   <Box
  //     sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
  //     role="presentation"
  //     onClick={toggleDrawer(anchor, false)}
  //     onKeyDown={toggleDrawer(anchor, false)}
  //   >
  //     <List
  //       sx={{
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         justifyContent: "space-around",
  //         paddingTop: "30px",
  //       }}
  //     >
  //       <SLink to="/vehicle">{<DisNavMenu>Motor</DisNavMenu>}</SLink>
  //       <SLink to="/vehicle">{<DisNavMenu>Caravan</DisNavMenu>}</SLink>
  //       <SLink to="/vehicle">{<DisNavMenu>Tuning</DisNavMenu>}</SLink>
  //       <SLink to="/vehicle">{<DisNavMenu>Used Cars</DisNavMenu>}</SLink>
  //       <SLink to="/vehicle">{<DisNavMenu2>Camping Place</DisNavMenu2>}</SLink>

  //       {<DisNavMenu2 onClick={SignOut}>Log out</DisNavMenu2>}
  //     </List>
  //   </Box>
  // );

  // return (
  //   <div>
  //     {["right"].map((anchor) => (
  //       <React.Fragment key={anchor}>
  //         <MenuButton onClick={toggleDrawer(anchor, true)} />
  //         <SwipeableDrawer
  //           anchor={anchor}
  //           open={state[anchor]}
  //           onClose={toggleDrawer(anchor, false)}
  //           onOpen={toggleDrawer(anchor, true)}
  //           sx={{ zIndex: "9999999" }}
  //         >
  //           {list(anchor)}
  //         </SwipeableDrawer>
  //       </React.Fragment>
  //     ))}
  //   </div>
  // );
}
