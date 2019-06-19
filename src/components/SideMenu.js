import React from "react";
import PropTypes from "prop-types";

import { slide as Menu } from "react-burger-menu";

import { AUTH_URL } from "../utils/untappdAPI";

import UserInformation from "./UserInformation";
import SearchBar from "./SearchBar";
import Toggle from "./Toggle";

const SideMenu = props => {
  const { userInfo, onLogout, onPinToggle, defaultPinMethod, onSubmitSearch, isLoading } = props;

  return (
    <Menu styles={styles} {...props}>
      {userInfo && <UserInformation userInfo={userInfo} />}

      {userInfo && (
        <div>
          <Toggle
            leftStateName="Pin Breweries"
            rightStateName="Pin Venues"
            onToggle={onPinToggle}
            defaultValue={defaultPinMethod}
          />
        </div>
      )}

      {userInfo && (
        <div className="mt3">
          <p className="mb1">Search another user:</p>
          <SearchBar handleSubmit={onSubmitSearch} isLoading={isLoading} />
        </div>
      )}

      {userInfo ? (
        <button className="mt3 br2" onClick={onLogout}>
          <span className="black">Logout</span>
        </button>
      ) : (
        <a className="" href={AUTH_URL}>
          Login
        </a>
      )}

      <div
        className="absolute bottom-0"
        style={{
          color: "#b8b7ad",
          "&:hover": {
            color: "#b8b7ad"
          }
        }}
      >
        created by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.twitter.com/miguelfox"
        >
          @miguelfox
        </a>
      </div>
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
  onLogout: PropTypes.func,
  onPinToggle: PropTypes.func,
  defaultPinMethod: PropTypes.bool,
  onSubmitSearch: PropTypes.func,
  isLoading: PropTypes.bool
};

export default SideMenu;
