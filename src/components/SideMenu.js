import React from "react";
import { slide as Menu } from "react-burger-menu";

const SideMenu = props => {
  const { userInfo } = props;
  console.log(userInfo);

  return (
    <Menu styles={styles} {...props}>
      {userInfo && (
        <div className="flex flex-row mb5" style={{display: 'flex'}}>
          <img
            style={{ maxWidth: "100px", maxHeight: "100px" }}
            src={userInfo.user_avatar}
            alt="User Avatar"
          />
          <div className="ml2 flex flex-column">
            <span className="f4 b mb1">{`${userInfo.first_name} ${userInfo.last_name}`}</span>
            <span className="f6 f5-l">
              Total Check-ins: {userInfo.stats.total_checkins}
            </span>
            <span className="f6 f5-l">Pinned Check-ins: 0</span>
            <span className="f6 f5-l">Beers: {userInfo.stats.total_beers}</span>
            <span className="f6 f5-l">Badges: {userInfo.stats.total_badges}</span>
          </div>
        </div>
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
