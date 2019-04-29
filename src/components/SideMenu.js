import React from "react";
import { slide as Menu } from "react-burger-menu";
import UserInformation from "./UserInformation";

const SideMenu = props => {
  const { userInfo } = props;
  console.log(userInfo);

  return (
    <Menu styles={styles} {...props}>
      {userInfo && (
        <UserInformation userInfo={userInfo}/>
      )}

      <hr className="black br1" />

      <a className="" href="/map">
        Map
      </a>

      <a className="menu-item" href="/about">
        About
      </a>

      <a className="menu-item" href="/github">
        GitHub
      </a>
    </Menu>
  );
};

const styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "36px",
    top: "36px"
  },
  bmBurgerBars: {
    background: "#373a47"
  },
  bmBurgerBarsHover: {
    background: "#a90000"
  },
  bmCrossButton: {
    height: "24px",
    width: "24px"
  },
  bmCross: {
    background: "#bdc3c7"
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%"
  },
  bmMenu: {
    background: "#373a47",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em"
  },
  bmMorphShape: {
    fill: "#373a47"
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em"
  },
  bmItem: {
    textDecoration: "none",
    marginBottom: "10px",
    color: "#d1d1d1",
    transition: "color 0.2s",
    outline: "none"
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};

export default SideMenu;
