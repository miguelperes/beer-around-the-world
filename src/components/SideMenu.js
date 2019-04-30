import React from "react";
import PropTypes from "prop-types";

import { slide as Menu } from "react-burger-menu";

import UserInformation from "./UserInformation";
import {AUTH_URL} from "../utils/untappdAPI";

const SideMenu = props => {
  const { userInfo, onLogout } = props;

  return (
    <Menu styles={styles} {...props}>
      {userInfo && <UserInformation userInfo={userInfo} />}

      {
        userInfo 
        ? <a className="" href="/" onClick={onLogout}>Logout</a>
        : <a className="" href={AUTH_URL}>Login</a>
      }
    </Menu>
  );
};

const styles = {
  bmBurgerButton: {
    position: "fixed",
    width: "36px",
    height: "30px",
    left: "3%",
    top: "2%"
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
    padding: "0.1em 0.1em 0",
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

SideMenu.propTypes = {
  userInfo: PropTypes.object,
  onLogout: PropTypes.func
};

export default SideMenu;
